'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' :
                                            'id="xs-controllers-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' :
                                        'id="xs-injectables-links-module-AppModule-7692cb64de2ede8f2d0bcef824949122b32cac16474ae913405071a2cc6f0083cb26a9205c9bb76aac841c46eaa304f42c6b8f8c818919da8b32bf99db60093b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' :
                                            'id="xs-controllers-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' :
                                        'id="xs-injectables-links-module-AuthModule-b5bb4ffc8738935163c50bf522ef1ad6c4d69ce2b01ca22d9280e650de72401ed807a4755d611164c7fe21815391fc2f6d7ce7940be3c1d8b68d16f4699b226d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EventsModule.html" data-type="entity-link" >EventsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UploaderModule.html" data-type="entity-link" >UploaderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' : 'data-bs-target="#xs-controllers-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' :
                                            'id="xs-controllers-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' }>
                                            <li class="link">
                                                <a href="controllers/UploaderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploaderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' : 'data-bs-target="#xs-injectables-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' :
                                        'id="xs-injectables-links-module-UploaderModule-4007d6d30df4fc03263eb5db538c30ef611e26315d6481e901bfeacf353575068d54a52622e7bff98f757aea42653df654085363295ec6ef431f89298d3ca1cc"' }>
                                        <li class="link">
                                            <a href="injectables/UploaderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploaderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' :
                                            'id="xs-controllers-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' }>
                                            <li class="link">
                                                <a href="controllers/UserPetsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserPetsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserProfilesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfilesController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' :
                                        'id="xs-injectables-links-module-UsersModule-6f402e549060c986ec6cb92daf258fa583cf4e99ceebf14c564707e69bce2e1a8eec335a247360af591baaed9febec9947c02ee26f530596e3d6791f991293ef"' }>
                                        <li class="link">
                                            <a href="injectables/UserPetsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserPetsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfilesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UploaderController.html" data-type="entity-link" >UploaderController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserPetsController.html" data-type="entity-link" >UserPetsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserProfilesController.html" data-type="entity-link" >UserProfilesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Competition.html" data-type="entity-link" >Competition</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Event.html" data-type="entity-link" >Event</a>
                                </li>
                                <li class="link">
                                    <a href="entities/File.html" data-type="entity-link" >File</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserPet.html" data-type="entity-link" >UserPet</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserProfile.html" data-type="entity-link" >UserProfile</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BaseController.html" data-type="entity-link" >BaseController</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseDto.html" data-type="entity-link" >BaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseService.html" data-type="entity-link" >BaseService</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompetitionDto.html" data-type="entity-link" >CreateCompetitionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateEventDto.html" data-type="entity-link" >CreateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserPetDto.html" data-type="entity-link" >CreateUserPetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserProfileDto.html" data-type="entity-link" >CreateUserProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupDto.html" data-type="entity-link" >SignupDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCompetitionDto.html" data-type="entity-link" >UpdateCompetitionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateEventDto.html" data-type="entity-link" >UpdateEventDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPetDto.html" data-type="entity-link" >UpdateUserPetDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserProfileDto.html" data-type="entity-link" >UpdateUserProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidUserDto.html" data-type="entity-link" >ValidUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshAuthGuard.html" data-type="entity-link" >JwtRefreshAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" >JwtRefreshStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UploaderService.html" data-type="entity-link" >UploaderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserPetsService.html" data-type="entity-link" >UserPetsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserProfilesService.html" data-type="entity-link" >UserProfilesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BasicResponseInterface.html" data-type="entity-link" >BasicResponseInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ControllerInterface.html" data-type="entity-link" >ControllerInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationInterface.html" data-type="entity-link" >PaginationInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServiceInterface.html" data-type="entity-link" >ServiceInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});