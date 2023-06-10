<script setup lang="ts">
import registerMultiStepsIllustration from '@images/pages/auth-register-multi-steps-illustration.png'
import ProfileList from '@/views/pages/auth/signup/ProfileList.vue'
import PetList from '@/views/pages/auth/signup/PetList.vue'
import Summary from '@/views/pages/auth/signup/Summary.vue'

const currentStep = ref(0)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const items = [
  {
    title: 'Account',
    icon: 'mdi-account-cog',
  },
  {
    title: 'Profile',
    icon: 'mdi-account-box-multiple',
  },
  {
    title: 'Favorite',
    icon: 'mdi-paw',
  },
  {
    title: 'Summary',
    icon: 'mdi-format-list-checks',
  },
]

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  profiles: [{
    avatar: [],
    firstName: '',
    lastName: '',
    description: '',
    isPrimary: true,
  }],
  pets: [{
    image: [],
    name: '',
    description: '',
    personality: '',
    color: '',
    breed: '',
    age: 5,
  }],
})

const onSubmit = () => {
  // eslint-disable-next-line no-alert
  alert('Submitted..!!')
}

const addProfile = (): void => {
  const profile = {
    avatar: [],
    firstName: '',
    lastName: '',
    description: '',
    isPrimary: false,
  }

  if (!form.profiles.find(searchProfile => searchProfile.isPrimary))
    profile.isPrimary = true

  form.profiles.push(profile)
}

const changePrimaryProfile = index => {
  form.profiles = form.profiles.map((profile, profileIndex) => ({
    ...profile,
    isPrimary: index === profileIndex,
  }))
}

// Pets
const addPet = (): void => {
  const pet = {
    image: [],
    name: '',
    description: '',
    personality: '',
    color: '',
    breed: '',
    age: 5,
  }

  form.pets.push(pet)
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      md="4"
      class="d-none d-md-flex align-center"
    >
      <!-- here your illustration -->
      <VImg
        :src="registerMultiStepsIllustration"
        class="auth-illustration"
        height="560px"
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
        style="max-width: 925px"
      >
        <div>
          <AppStepper
            v-model:current-step="currentStep"
            :items="items"
            :direction="$vuetify.display.smAndUp ? 'horizontal' : 'vertical'"
            class="mb-8"
          />
        </div>

        <VWindow
          v-model="currentStep"
          class="disable-tab-transition"
        >
          <VForm>
            <VWindowItem>
              <h5 class="text-h5 mb-1">
                {{ $t('Account') }}
              </h5>
              <p class="text-sm">
                {{ $t('signup.EnterYourAccountInformation') }}
              </p>

              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="form.username"
                    :label="$t('UserName')"
                    placeholder="John Doe"
                  />
                </VCol>

                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="form.email"
                    :label="$t('Email')"
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
                    :type="isConfirmPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isConfirmPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                  />
                </VCol>
              </VRow>
            </VWindowItem>

            <VWindowItem>
              <div
                class="d-flex justify-space-between align-center"
                style="max-width: 365px"
              >
                <div>
                  <h5 class="text-h5 mb-1">
                    {{ $t('Profile', 2) }}
                  </h5>
                  <p class="text-sm">
                    {{ $t('signup.CreateAPlayerProfiles') }}
                  </p>
                </div>
                <VBtn
                  variant="flat"
                  icon
                  color="success"
                  :disabled="form.profiles.length === 3"
                  @click="addProfile"
                >
                  <VIcon icon="mdi-plus" />
                </VBtn>
              </div>
              <ProfileList
                :profiles="form.profiles"
                @remove-profile="form.profiles.splice($event, 1)"
                @change-profile-field="form.profiles[$event.index][$event.key] = $event.value"
                @change-primary-profile="changePrimaryProfile"
              />
            </VWindowItem>

            <VWindowItem>
              <div
                class="d-flex justify-space-between align-center"
                style="max-width: 365px"
              >
                <div>
                  <h5 class="text-h5 mb-1">
                    {{ $t('Pet', 2) }}
                  </h5>
                  <p class="text-sm">
                    {{ $t('signup.AddOwnPetsToAccount') }}
                  </p>
                </div>
                <VBtn
                  variant="flat"
                  icon
                  color="success"
                  :disabled="form.pets.length === 3"
                  @click="addPet"
                >
                  <VIcon icon="mdi-plus" />
                </VBtn>
              </div>
              <PetList
                :pets="form.pets"
                @remove-profile="form.pets.splice($event, 1)"
                @change-profile-field="form.pets[$event.index][$event.key] = $event.value"
              />
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
          </VForm>
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
            {{ $t('Submit') }}
          </VBtn>

          <VBtn
            v-else
            @click="currentStep++"
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
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
