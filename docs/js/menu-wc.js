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
                    <a href="index.html" data-type="index-link">aethon-nestjs-boilerplate documentation</a>
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
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
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
                                <a href="modules/ExampleModule.html" data-type="entity-link" >ExampleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' : 'data-bs-target="#xs-controllers-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' :
                                            'id="xs-controllers-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' }>
                                            <li class="link">
                                                <a href="controllers/ExampleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExampleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' : 'data-bs-target="#xs-injectables-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' :
                                        'id="xs-injectables-links-module-ExampleModule-4d05e988034a6eb99fa1ddd7dfbadd45bc3826ae956b04d384e9e3fe82b6934f582e914a17e0cd9f253ce34c7c1b97b75ca232d10798dcecfabd8eb65db11c5a"' }>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExampleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExampleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/FooModule.html" data-type="entity-link" >FooModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PersistenceModule.html" data-type="entity-link" >PersistenceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersistenceModule-a878f36a51c3007496a13e36a86acca93ff784009fc9995eda60b0a36794a8f554752d241d6b3b1537e0d68848d818099dc33a18d0e9791144df6202543d89fa"' : 'data-bs-target="#xs-injectables-links-module-PersistenceModule-a878f36a51c3007496a13e36a86acca93ff784009fc9995eda60b0a36794a8f554752d241d6b3b1537e0d68848d818099dc33a18d0e9791144df6202543d89fa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersistenceModule-a878f36a51c3007496a13e36a86acca93ff784009fc9995eda60b0a36794a8f554752d241d6b3b1537e0d68848d818099dc33a18d0e9791144df6202543d89fa"' :
                                        'id="xs-injectables-links-module-PersistenceModule-a878f36a51c3007496a13e36a86acca93ff784009fc9995eda60b0a36794a8f554752d241d6b3b1537e0d68848d818099dc33a18d0e9791144df6202543d89fa"' }>
                                        <li class="link">
                                            <a href="injectables/CachingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CachingService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DatabaseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DatabaseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersistenceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistenceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RootModule.html" data-type="entity-link" >RootModule</a>
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
                                    <a href="entities/Example.html" data-type="entity-link" >Example</a>
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
                                <a href="classes/DefaultExceptionFilter.html" data-type="entity-link" >DefaultExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExampleCreateDTO.html" data-type="entity-link" >ExampleCreateDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExampleGetDTO.html" data-type="entity-link" >ExampleGetDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExampleUpdateDTO.html" data-type="entity-link" >ExampleUpdateDTO</a>
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
                                    <a href="injectables/APIResponseInterceptor.html" data-type="entity-link" >APIResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
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
                                <a href="interfaces/APIError.html" data-type="entity-link" >APIError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/APIResponseError.html" data-type="entity-link" >APIResponseError</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/APIResponseMeta.html" data-type="entity-link" >APIResponseMeta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/APIResponseOneData.html" data-type="entity-link" >APIResponseOneData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/APIResponsePaginatedData.html" data-type="entity-link" >APIResponsePaginatedData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/APIResponseSuccess.html" data-type="entity-link" >APIResponseSuccess</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExampleInterface.html" data-type="entity-link" >ExampleInterface</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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