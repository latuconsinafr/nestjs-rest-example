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
                    <a href="index.html" data-type="index-link">nestjs-rest-example documentation</a>
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
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-2f5caf5823d948f7a6ac46466a13b9a4ce5b53e36932e588ce15f88480d71f17319c5f204c760fd8ba82dcd9c7dbf9f7e4095afe7373eeb977bfd76a42d05c86"' : 'data-target="#xs-controllers-links-module-AppModule-2f5caf5823d948f7a6ac46466a13b9a4ce5b53e36932e588ce15f88480d71f17319c5f204c760fd8ba82dcd9c7dbf9f7e4095afe7373eeb977bfd76a42d05c86"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-2f5caf5823d948f7a6ac46466a13b9a4ce5b53e36932e588ce15f88480d71f17319c5f204c760fd8ba82dcd9c7dbf9f7e4095afe7373eeb977bfd76a42d05c86"' :
                                            'id="xs-controllers-links-module-AppModule-2f5caf5823d948f7a6ac46466a13b9a4ce5b53e36932e588ce15f88480d71f17319c5f204c760fd8ba82dcd9c7dbf9f7e4095afe7373eeb977bfd76a42d05c86"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' : 'data-target="#xs-controllers-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' :
                                            'id="xs-controllers-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' : 'data-target="#xs-injectables-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' :
                                        'id="xs-injectables-links-module-AuthModule-5721e0005e49933c38b884bad1efd92228a0bd60ce1e649cbc4163af7208e7739c24d7cf826b6a309f976b28770d6614e6e52766a65ba62fc840e33c33b1b9c1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
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
                                <a href="modules/CommonServicesModule.html" data-type="entity-link" >CommonServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' : 'data-target="#xs-controllers-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' :
                                            'id="xs-controllers-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' : 'data-target="#xs-injectables-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' :
                                        'id="xs-injectables-links-module-PostsModule-6001d2d41e95a72d0e7b7e8c281f6bd32dc952c12b1ee745691579403af45e4b333b18d5549c42920fb35faf2a321bd412e0ccb68388a2ccf35fc84d9126b568"' }>
                                        <li class="link">
                                            <a href="injectables/IsPostExistValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsPostExistValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostByIdPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostByIdPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StoragesModule.html" data-type="entity-link" >StoragesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' : 'data-target="#xs-controllers-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' :
                                            'id="xs-controllers-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' }>
                                            <li class="link">
                                                <a href="controllers/StoragesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoragesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' : 'data-target="#xs-injectables-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' :
                                        'id="xs-injectables-links-module-StoragesModule-4ce1e3a32ae412ffd399dfb27056f1cfae5070eb4b4dbe782ceb35c7c27f567b9b4ecff5759a5b1c2643f6640da5810844689daeaf8881554ead55ed21da2177"' }>
                                        <li class="link">
                                            <a href="injectables/IsLocalFileExistValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsLocalFileExistValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StoragesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoragesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TasksModule.html" data-type="entity-link" >TasksModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TasksModule-1d9f062da52d86a7f7c0b48966c801e50551cd9c45603803658d03697269a012973322e6694831fd98e11759933707c57caa397a10e7a58e757e7bbabc045323"' : 'data-target="#xs-injectables-links-module-TasksModule-1d9f062da52d86a7f7c0b48966c801e50551cd9c45603803658d03697269a012973322e6694831fd98e11759933707c57caa397a10e7a58e757e7bbabc045323"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TasksModule-1d9f062da52d86a7f7c0b48966c801e50551cd9c45603803658d03697269a012973322e6694831fd98e11759933707c57caa397a10e7a58e757e7bbabc045323"' :
                                        'id="xs-injectables-links-module-TasksModule-1d9f062da52d86a7f7c0b48966c801e50551cd9c45603803658d03697269a012973322e6694831fd98e11759933707c57caa397a10e7a58e757e7bbabc045323"' }>
                                        <li class="link">
                                            <a href="injectables/TasksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TasksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TopicsModule.html" data-type="entity-link" >TopicsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' : 'data-target="#xs-controllers-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' :
                                            'id="xs-controllers-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' }>
                                            <li class="link">
                                                <a href="controllers/TopicsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopicsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' : 'data-target="#xs-injectables-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' :
                                        'id="xs-injectables-links-module-TopicsModule-5e6a7dded6ebf684fc187d0750875ad794383adfd99043092d8c82c019614b28da03267414f39b10f8d5f82cf52c09bc4821a8e5b01e6aa7e8a5c1ef9ae47110"' }>
                                        <li class="link">
                                            <a href="injectables/IsNameUniqueValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsNameUniqueValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsTopicExistValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsTopicExistValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicByIdPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopicByIdPipe</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopicsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' : 'data-target="#xs-controllers-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' :
                                            'id="xs-controllers-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' : 'data-target="#xs-injectables-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' :
                                        'id="xs-injectables-links-module-UsersModule-2987e6615e57da1848425ae7715cca17fe55ac8b3ba3bb2f6d4ca88c6fdca43cf98b7ca60ac9455808ea6025eeeefab94c4b62b5826c5e56ef8d56e9d8344fbf"' }>
                                        <li class="link">
                                            <a href="injectables/IsEmailUniqueValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsEmailUniqueValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsPhoneNumberUniqueValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsPhoneNumberUniqueValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsUserExistValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsUserExistValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/IsUsernameUniqueValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IsUsernameUniqueValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserByIdPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserByIdPipe</a>
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
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/LocalFile.html" data-type="entity-link" >LocalFile</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Topic.html" data-type="entity-link" >Topic</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserProfile.html" data-type="entity-link" >UserProfile</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddFirstAndLastNameAttribute1669010304048.html" data-type="entity-link" >AddFirstAndLastNameAttribute1669010304048</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddLocalFileTable1675692342862.html" data-type="entity-link" >AddLocalFileTable1675692342862</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddPostTable1678073082722.html" data-type="entity-link" >AddPostTable1678073082722</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddRoleTable1675697129483.html" data-type="entity-link" >AddRoleTable1675697129483</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddTopicTable1678958507781.html" data-type="entity-link" >AddTopicTable1678958507781</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddUserProfileTable1669618726311.html" data-type="entity-link" >AddUserProfileTable1669618726311</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterLastSignedInAtAttribute1678189980290.html" data-type="entity-link" >AlterLastSignedInAtAttribute1678189980290</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterPhoneAttributeUniqueness1676900183425.html" data-type="entity-link" >AlterPhoneAttributeUniqueness1676900183425</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterRoleNameAttribute1675699186800.html" data-type="entity-link" >AlterRoleNameAttribute1675699186800</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterTablesCascade1678096726170.html" data-type="entity-link" >AlterTablesCascade1678096726170</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterTablesCreatedAndUpdatedAt1678183368786.html" data-type="entity-link" >AlterTablesCreatedAndUpdatedAt1678183368786</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterTablesIdentifierToUuid1676872212399.html" data-type="entity-link" >AlterTablesIdentifierToUuid1676872212399</a>
                            </li>
                            <li class="link">
                                <a href="classes/AlterUserRolesAttribute1679276151891.html" data-type="entity-link" >AlterUserRolesAttribute1679276151891</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppEnvironmentVariables.html" data-type="entity-link" >AppEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/CacheEnvironmentVariables.html" data-type="entity-link" >CacheEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConflictErrorResponse.html" data-type="entity-link" >ConflictErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConflictException.html" data-type="entity-link" >ConflictException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ContentTooLargeException.html" data-type="entity-link" >ContentTooLargeException</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatedSuccessResponse.html" data-type="entity-link" >CreatedSuccessResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateLocalFileRequest.html" data-type="entity-link" >CreateLocalFileRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostRequest.html" data-type="entity-link" >CreatePostRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTopicRequest.html" data-type="entity-link" >CreateTopicRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserProfileRequest.html" data-type="entity-link" >CreateUserProfileRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserRequest.html" data-type="entity-link" >CreateUserRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseEnvironmentVariables.html" data-type="entity-link" >DatabaseEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorResponse.html" data-type="entity-link" >ErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForbiddenErrorResponse.html" data-type="entity-link" >ForbiddenErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForbiddenException.html" data-type="entity-link" >ForbiddenException</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenericEntity.html" data-type="entity-link" >GenericEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitialMigration1668674726738.html" data-type="entity-link" >InitialMigration1668674726738</a>
                            </li>
                            <li class="link">
                                <a href="classes/InternalServerErrorErrorResponse.html" data-type="entity-link" >InternalServerErrorErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/InternalServerErrorException.html" data-type="entity-link" >InternalServerErrorException</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtEnvironmentVariables.html" data-type="entity-link" >JwtEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalFileIdParam.html" data-type="entity-link" >LocalFileIdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalFileSeeder.html" data-type="entity-link" >LocalFileSeeder</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalFileUploadEnvironmentVariables.html" data-type="entity-link" >LocalFileUploadEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoggerEnvironmentVariables.html" data-type="entity-link" >LoggerEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoContentSuccessResponse.html" data-type="entity-link" >NoContentSuccessResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotFoundErrorResponse.html" data-type="entity-link" >NotFoundErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/NotFoundException.html" data-type="entity-link" >NotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/OkSuccessResponse.html" data-type="entity-link" >OkSuccessResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostIdParam.html" data-type="entity-link" >PostIdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostResponse.html" data-type="entity-link" >PostResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostSeeder.html" data-type="entity-link" >PostSeeder</a>
                            </li>
                            <li class="link">
                                <a href="classes/RateLimitingEnvironmentVariables.html" data-type="entity-link" >RateLimitingEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/RedisStoreEnvironmentVariables.html" data-type="entity-link" >RedisStoreEnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemovePostTitleAttribute1678285751957.html" data-type="entity-link" >RemovePostTitleAttribute1678285751957</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveRoleTable1679272991389.html" data-type="entity-link" >RemoveRoleTable1679272991389</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestTimeoutErrorResponse.html" data-type="entity-link" >RequestTimeoutErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestTimeoutException.html" data-type="entity-link" >RequestTimeoutException</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInRequest.html" data-type="entity-link" >SignInRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInResponse.html" data-type="entity-link" >SignInResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/SuccessResponse.html" data-type="entity-link" >SuccessResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TimestampResponse.html" data-type="entity-link" >TimestampResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TooManyRequestsErrorResponse.html" data-type="entity-link" >TooManyRequestsErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TooManyRequestsException.html" data-type="entity-link" >TooManyRequestsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/TopicIdParam.html" data-type="entity-link" >TopicIdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/TopicResponse.html" data-type="entity-link" >TopicResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/TopicSeeder.html" data-type="entity-link" >TopicSeeder</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedErrorResponse.html" data-type="entity-link" >UnauthorizedErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedException.html" data-type="entity-link" >UnauthorizedException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnprocessableEntityErrorResponse.html" data-type="entity-link" >UnprocessableEntityErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnprocessableEntityException.html" data-type="entity-link" >UnprocessableEntityException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostRequest.html" data-type="entity-link" >UpdatePostRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostTopicsRequest.html" data-type="entity-link" >UpdatePostTopicsRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTopicRequest.html" data-type="entity-link" >UpdateTopicRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPasswordRequest.html" data-type="entity-link" >UpdateUserPasswordRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserProfileAvatarRequest.html" data-type="entity-link" >UpdateUserProfileAvatarRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserProfileRequest.html" data-type="entity-link" >UpdateUserProfileRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserRequest.html" data-type="entity-link" >UpdateUserRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserRolesRequest.html" data-type="entity-link" >UpdateUserRolesRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserIdParam.html" data-type="entity-link" >UserIdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfileResponse.html" data-type="entity-link" >UserProfileResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserProfileSeeder.html" data-type="entity-link" >UserProfileSeeder</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSeeder.html" data-type="entity-link" >UserSeeder</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/HttpCacheInterceptor.html" data-type="entity-link" >HttpCacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalFileByIdPipe.html" data-type="entity-link" >LocalFileByIdPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseIntPipe.html" data-type="entity-link" >ParseIntPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostByIdHook.html" data-type="entity-link" >PostByIdHook</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TopicByIdHook.html" data-type="entity-link" >TopicByIdHook</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserByIdHook.html" data-type="entity-link" >UserByIdHook</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ApiErrorResponseMetadata.html" data-type="entity-link" >ApiErrorResponseMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiSuccessResponseMetadata.html" data-type="entity-link" >ApiSuccessResponseMetadata</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiSuccessResponseMetadataOptions.html" data-type="entity-link" >ApiSuccessResponseMetadataOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppConfigOptions.html" data-type="entity-link" >AppConfigOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthResponse.html" data-type="entity-link" >AuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RequestWithAuthUser.html" data-type="entity-link" >RequestWithAuthUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayload.html" data-type="entity-link" >TokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ValidationErrors.html" data-type="entity-link" >ValidationErrors</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
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
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});