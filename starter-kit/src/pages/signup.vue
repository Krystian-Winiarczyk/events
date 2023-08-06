<script setup lang="ts">
import { VForm } from 'vuetify/components/VForm'
import { confirmedValidator, emailValidator, requiredValidator } from '@core/utils/validators'

import signup2Ilustration from '@images/pages/ilustracja.png'

// import ProfileList from '@/views/pages/auth/signup/ProfileList.vue'
// import PetList from '@/views/pages/auth/signup/PetList.vue'
import Summary from '@/views/pages/auth/signup/Summary.vue'
import { useFilesUploader } from '@core/composable/useFilesUploader'
import { useAuthStore } from "@/store/auth";
import PetListCard from '@/views/pages/auth/signup/PetListCard.vue'
import ProfileListCard from '@/views/pages/auth/signup/ProfileListCard.vue'

const authStore = useAuthStore()

const { upload } = useFilesUploader()

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isCurrentStepValid = ref(true)

const accountFormRef = ref()
const profileFormRef = ref()
const petFormRef = ref()

const items = [
  {
    key: 'account',
    title: 'Account',
    icon: 'mdi-account-cog',
  },
  {
    key: 'profile',
    title: 'Profile',
    icon: 'mdi-account-box-multiple',
  },
  {
    key: 'favorite',
    title: 'Favorite',
    icon: 'mdi-paw',
  },
  {
    key: 'summary',
    title: 'Summary',
    icon: 'mdi-format-list-checks',
  },
]

const form = reactive({
  email: `test.${new Date().toLocaleDateString()}${new Date().getTime()}@wp.pl`,
  password: '444',
  confirmPassword: '444',
  profile: {
    avatar: [],
    firstName: 'Adam',
    lastName: 'Tester',
    nickname: 'Testowiron',
    description: 'Lorem ipsum dolor sit amet, consect',
    birthDate: new Date(),
    gender: 'MALE',
  },
  pet: {
    images: [],
    name: 'Java',
    passportNumber: 'XYZ123-312',
    height: 52,
    description: 'Lorem ipsum dolor sit amet, consect',
    breed: 'Bernese Mountain Dog',
    birthDate: new Date(),
  },
})

const onSubmit = async () => {
  const formItem = JSON.parse(JSON.stringify(form))

  formItem.email = (new Date().getSeconds()) + formItem.email

  const avatar = form.profile.avatar?.length ? form.profile.avatar[0] : null
  const petImage = form.pet.images?.length ? form.pet.images[0] : null

  const avatarsResponse = avatar ? await upload([avatar], 'Avatars', 'mdi-my', 'AVATAR') : null
  const petImagesResponse = petImage ? await upload([petImage], 'PetImages', 'mdi-paw', 'AVATAR') : null

  formItem.profile.avatar = avatarsResponse?.data?.items[0]?.id || null
  delete formItem.pet.images
  formItem.pet.avatar = petImagesResponse?.data?.items[0]?.id || null

  // formItem.profile.avatar = 3 ?? null
  // formItem.pet.images = [4].filter(Boolean)

  try {
    await authStore.signup(formItem)
  } catch (err) {
    console.log(err)
  }
}

// const addProfile = (): void => {
//   const profile = {
//     avatar: [],
//     firstName: '',
//     lastName: '',
//     description: '',
//     isPrimary: false,
//   }
//
//   form.profiles.push(profile)
// }

// const changePrimaryProfile = index => {
//   form.profiles = form.profiles.map((profile, profileIndex) => ({
//     ...profile,
//     isPrimary: index === profileIndex,
//   }))
// }

// Pets
// const addPet = (): void => {
//   const my-my-pets = {
//     image: [],
//     name: '',
//     description: '',
//     personality: '',
//     color: '',
//     breed: '',
//     age: 5,
//   }
//
//   form.pets.push(my-my-pets)
// }

const validateAccountForm = () => {
  console.log(accountFormRef.value)
  accountFormRef.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validateProfileForm = () => {
  profileFormRef.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const validatePetForm = () => {
  petFormRef.value?.validate().then(valid => {
    if (valid.valid) {
      currentStep.value++
      isCurrentStepValid.value = true
    }
    else { isCurrentStepValid.value = false }
  })
}

const nextStep = () => {
  if (items[currentStep.value].key === 'account')
    validateAccountForm()
  if (items[currentStep.value].key === 'profile')
    validateProfileForm()
  if (items[currentStep.value].key === 'favorite')
    validatePetForm()

  // currentStep.value++
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper page-signup"
  >
    <VCol
      md="4"
      class="d-none d-md-flex align-center"
      style="background-color: rgb(var(--v-theme-primary));"
    >
      <!-- here your illustration -->
      <VImg
        :src="signup2Ilustration"
        class="auth-illustration"
        cover
        style="max-height: 400px;"
      />
    </VCol>

    <VCol
      cols="12"
      md="8"
      class="auth-card-v2 d-flex justify-center pa-5"
      style="background-color: rgb(var(--v-theme-surface));"
    >
      <VCard
        flat
        class="mt-12 px-1"
        style="max-width: 700px; width: 100%"
      >
        <div>
          <AppStepper
            v-model:current-step="currentStep"
            :items="items"
            align="start"
            :direction="$vuetify.display.smAndUp ? 'horizontal' : 'vertical'"
            class="mb-8"
            :is-active-step-valid="isCurrentStepValid"
          />
        </div>

        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
          style="max-width: 700px"
        >
          <VWindowItem>
            <h5 class="text-h5 mb-1">
              {{ $t('Account') }}
            </h5>
            <p class="text-sm">
              {{ $t('signup.EnterYourAccountInformation') }}
            </p>

            <VForm ref="accountFormRef">
              <VRow>
                <VCol
                  cols="12"
                >
                  <VTextField
                    v-model="form.email"
                    :label="$t('Email')"
                    :rules="[requiredValidator, emailValidator]"
                    placeholder="johndoe@email.com"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="form.password"
                    :label="$t('Password')"
                    :placeholder="$t('signup.TypePassword')"
                    :rules="[requiredValidator]"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="form.confirmPassword"
                    :label="$t('ConfirmPassword')"
                    :placeholder="$t('signup.TypePasswordAgain')"
                    :rules="[requiredValidator, confirmedValidator(form.confirmPassword, form.password)]"
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  />
                </VCol>
              </VRow>
            </VForm>
          </VWindowItem>

          <VWindowItem>
            <div
              class="d-flex justify-space-between align-center"
              style="max-width: 700px"
            >
              <div>
                <h5 class="text-h5 mb-1">
                  {{ $t('Profile') }}
                </h5>
                <p class="text-sm">
                  {{ $t('signup.CreateAPlayerProfiles') }}
                </p>
              </div>
            </div>
            <VForm ref="profileFormRef">
              <ProfileListCard
                :profile="form.profile"
                @change-field="form.profile[$event.key] = $event.value"
              />
            </VForm>
          </VWindowItem>

          <VWindowItem>
            <div
              class="d-flex justify-space-between align-center"
              style="max-width: 700px"
            >
              <div>
                <h5 class="text-h5 mb-1">
                  {{ $t('Favorite') }}
                </h5>
                <p class="text-sm">
                  {{ $t('signup.AddOwnPetsToAccount') }}
                </p>
              </div>
            </div>
            <VForm ref="petFormRef">
              <PetListCard
                :pet="form.pet"
                @change-field="form.pet[$event.key] = $event.value"
              />
            </VForm>
          </VWindowItem>

          <VWindowItem>
            <h5 class="text-h5">
              {{ $t('Summary') }}
            </h5>
            <p class="text-sm">
              {{ $t('signup.VerifyYourData') }}
            </p>

            <Summary :data="form" />
          </VWindowItem>
        </VWindow>

        <div class="d-flex flex-wrap justify-sm-space-between justify-center gap-x-4 gap-y-2 mt-5">
          <VBtn
            color="secondary"
            variant="outlined"
            :disabled="currentStep === 0"
            @click="currentStep--"
          >
            <VIcon
              icon="mdi-arrow-left"
              start
              class="flip-in-rtl"
            />
            {{ $t('Previous') }}
          </VBtn>

          <VBtn
            v-if="items.length - 1 === currentStep"
            color="success"
            append-icon="mdi-check"
            @click="onSubmit"
          >
            {{ $t('Confirm') }}
          </VBtn>

          <VBtn
            v-else
            @click="nextStep"
          >
            {{ $t('Next') }}

            <VIcon
              icon="mdi-arrow-right"
              end
              class="flip-in-rtl"
            />
          </VBtn>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
.page-signup {
  & .pt-0 {
    .v-field__input {
      padding-top: 0 !important;
    }

    .v-input__details {
      margin-top: -20px !important;
    }
  }

  .v-list-item {
    min-height: 32px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
}
</style>

<route lang="yaml">
meta:
  layout: blank
  authRequired: false
</route>
