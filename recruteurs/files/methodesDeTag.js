window.tc_vars=window.tc_vars||{};window.tagEnAttente=window.tagEnAttente||[];if(!window.ATInternet)window.ATInternet={};function merge(obj1,obj2){return[obj1,obj2].reduce(function(r,o){try{Object.keys(o).forEach(function(k){r[k]=o[k]})}catch(e){}return r},{})}
function tagDeClick(param){tc_vars=tc_vars||{};tc_vars.name=param.name;tc_vars.chapters=[param.chapter1,param.chapter2,param.chapter3];tc_vars.level2=param.level2;tc_vars.type=param.type;tc_vars.customObjects=merge(tc_vars.customObjects||{},param.customObject);if(window.tC&&(tC.event&&tC.event.tag))tC.event.tag();else window.tagEnAttente.push(JSON.parse(JSON.stringify(tc_vars)));tc_vars.type=""}
function tagDePage(tagDePageObj){if(window.tC&&(tC.event&&tC.event.tag))tagDePageCustomSynchrone(tagDePageObj,customVarSiteObj,arborescenceObj,identifiedVisitors);else tagDePageCustomAsynchrone(tagDePageObj,customVarSiteObj,arborescenceObj,identifiedVisitors)}function tagDePageSynchrone(param){setTagDePage(param);dispatchSmartTagAvecVerification()}
function tagDePageCustom(tagDePageObj,customVarSiteObj,arborescenceObj,identifiedVisitors,customVarPageObj){if(window.tC&&(tC.event&&tC.event.tag))tagDePageCustomSynchrone(tagDePageObj,customVarSiteObj,arborescenceObj,identifiedVisitors,customVarPageObj);else tagDePageCustomAsynchrone(tagDePageObj,customVarSiteObj,arborescenceObj,identifiedVisitors,customVarPageObj)}
function tagDePageCustomSynchrone(tagDePageObj,customVarSiteObj,arborescenceObj,identifiedVisitors,customVarPageObj){setTagDePage(tagDePageObj);if(customVarSiteObj)setCustomVarsSite(customVarSiteObj);if(customVarPageObj)setCustomVarsPage(customVarPageObj);if(arborescenceObj)setArborescence(arborescenceObj);if(identifiedVisitors)setIdentifiedVisitors(identifiedVisitors);dispatchSmartTagAvecVerification()}
function tagDePageCustomAsynchrone(tagDePageObj,customVarSiteObj,arborescenceObj,identifiedVisitors,customVarPageObj){setTagDePage(tagDePageObj);if(customVarSiteObj)setCustomVarsSite(customVarSiteObj);if(customVarPageObj)setCustomVarsPage(customVarPageObj);if(arborescenceObj)setArborescence(arborescenceObj);if(identifiedVisitors)setIdentifiedVisitors(identifiedVisitors);window.tagEnAttente.push(JSON.parse(JSON.stringify(tc_vars)));tc_vars.type=""}
function setTagDePageAndDispatch(param){setTagDePage(param);dispatchSmartTagAvecVerification()}function setTagDePage(param){tc_vars.name=param.name;tc_vars.chapters=[param.chapter1,param.chapter2,param.chapter3];tc_vars.level2=param.level2;tc_vars.customObjects=merge(tc_vars.customObjects||{},param.customObject);tc_vars.type="page"}function setCustomVarsComplet(param){setCustomVarsSite(param);setCustomVarsPage(param)}
function setCustomVarsSite(param){tc_vars.customVars={techno:param.technology,client:param.category,ident:param.authent,pn:param.pn}}function setCustomVarsSiteSpecifique(param){tc_vars.customVars={techno:param.technology,client:param.category,ident:param.authent,pn:param.pn};tc_vars.customObjects=tc_vars.customObjects||{};tc_vars.customObjects.nomPartenaire=param.indicateurSite4}function setCustomVarsPage(param){tc_vars.customObjects=tc_vars.customObjects||{};tc_vars.customObjects=param}
function setIdentifiedVisitors(param){tc_vars.identifiedVisitor={id:param.idExterne,category:param.candidatDE}}function setInternalSearch(param){tc_vars.customObjects=tc_vars.customObjects||{};tc_vars.customObjects.internalSearch={keyword:param.moteur,resultPageNumber:param.pageNumber}}function setArborescence(param){tc_vars.customObjects=tc_vars.customObjects||{};tc_vars.customObjects.customTreeStructure={category1:param.category1,category2:param.category2,category3:param.category3}}
function dispatchSmartTagAvecVerification(){if(window.tC&&(tC.event&&tC.event.tag))tC.event.tag()};