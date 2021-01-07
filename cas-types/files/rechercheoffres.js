(function(){define("rechercheoffres/recherche-offres",["jquery","bootstrap/tooltip","../offre/selection","geoloc/map-render","popinShareCommon","t5/core/ajax","t5/core/events","isMobile","underscore","bootstrap/affix"],function($,tooltip,selection,map,popinShareCommon,ajax,events,isMobile,_){var elementSelectedBeforeDebounce="";var listeOffreAffichage;var toggleMapClass="with-map",$mapClassHolder=$("body");var messageChargement;var timerMessageChargement;popinShareCommon.init(["PopinMail"]);if(!document.body.classList.contains("standalone"))map.init();
$(document).on("click",".dropdown-menu.dropdown-menu-form",function(e){var parent=$(this).parent(".btn-group");if(!parent.hasClass("open"))parent.find(".dropdown-toggle").click()});$(document).on("keydown",function(e){if(e.key===" ")if(document.activeElement.id.startsWith("btnSubmitRechercheForm")){e.preventDefault();elementSelectedBeforeDebounce=document.activeElement.id;$('form[id*\x3d"rechercheForm"]').submit()}});$(document).on("click",'a[id*\x3d"btnToutReinitialiser"]',function(){elementSelectedBeforeDebounce=
"btnToutReinitialiser"});$("main").on("click",".btn-map",function(e){$mapClassHolder.addClass(toggleMapClass);$(".wrap-panel-map").removeAttr("aria-hidden").attr("tabindex","-1").focus()}).on("click",".panel-map .btn-nav",function(e){$mapClassHolder.removeClass(toggleMapClass);$(".wrap-panel-map").removeAttr("tabindex").attr("aria-hidden","true");$(".btn-map").focus()}).on("click",".panel-left, .panel-center",function(e){if(!$(e.target).hasClass("btn-map")&&$mapClassHolder.hasClass(toggleMapClass)){$mapClassHolder.removeClass(toggleMapClass);
$(".wrap-panel-map").removeAttr("tabindex").attr("aria-hidden","true");$(".btn-map").focus()}});var standaloneSelector=$(".standalone .sticky-wrapper");standaloneSelector.affix({offset:{top:function(){return this.top=$(".sticky-wrapper").offset().top}}});standaloneSelector.on("affix.bs.affix",function(e){$(this).addClass("fadeIn")});standaloneSelector.on("affix-top.bs.affix ",function(e){$(this).removeClass("fadeIn")});var modal=document.querySelector(".modal-details-offre");var modalHeader=document.querySelector(".modal-details-offre .modal-header");
function sticky(){modal.classList.add("modal-fixed");modalHeader.classList.add("fadeIn")}function unsticky(){modal.classList.remove("modal-fixed");modalHeader.classList.remove("fadeIn")}document.querySelector(".modal-details-offre").addEventListener("scroll",function(){var header_height=modalHeader.clientHeight;scrollpos=document.querySelector(".modal-details-offre").scrollTop;if(scrollpos>=header_height)sticky();else if(scrollpos<=0)unsticky()});var observer=new MutationObserver(function(mutations){mutations.forEach(function(mutation){if(mutation.attributeName===
"class"){var attributeValue=jQuery(mutation.target).prop(mutation.attributeName);if(attributeValue.indexOf("with-map")>=0){$(document).on("keyup.esc_map",function(e){if(e.key==="Escape"||(e.key==="Esc"||e.key===27)){$mapClassHolder.removeClass(toggleMapClass);$(".wrap-panel-map").removeAttr("tabindex").attr("aria-hidden","true");$(".btn-map").focus()}});trapFocusMap(".wrap-panel-map","add")}else{$(document).unbind("keyup.esc_map");trapFocusMap(".wrap-panel-map","remove")}}})});observer.observe($mapClassHolder[0],
{attributes:true});function trapFocusMap(elementSelect,action,namespace,nbRecursiveCalls){if(nbRecursiveCalls===undefined)nbRecursiveCalls=0;var element=document.querySelector(elementSelect);if(element){var focusableEls=element.querySelectorAll('a[href], button, textarea, input[type\x3d"text"], input[type\x3d"radio"], input[type\x3d"checkbox"], select');if(focusableEls.length<=1&&nbRecursiveCalls<20){setTimeout(function(){trapFocusMap(elementSelect,action,namespace,++nbRecursiveCalls)},200);return}var firstFocusableEl=
focusableEls[0];lastFocusableEl=focusableEls[focusableEls.length-2];KEYCODE_TAB=9;if(action==="add")element.addEventListener("keydown",handleKeyDown,true);else if(action==="remove")element.removeEventListener("keydown",handleKeyDown,true);function handleKeyDown(e){var isTabPressed=e.key==="Tab"||e.keyCode===KEYCODE_TAB;if(!isTabPressed)return;if(e.shiftKey)if(document.activeElement===firstFocusableEl){lastFocusableEl.focus();e.preventDefault()}else{if($(document.activeElement).hasClass("wrap-panel-map")){lastFocusableEl.focus();
e.preventDefault()}}else if(document.activeElement===lastFocusableEl){firstFocusableEl.focus();e.preventDefault()}}}}$("#PopinIndisponibilite, #PopinErreurGenerique").on("shown.bs.modal",function(event){ajouterOuRetireBlockerRecherche(false)});$(document).on("click",'a[id*\x3d"boutonEnregistrerRechercheConnecte"]',function(event){ajax("/offres/recherche.rechercheoffre:rafraichirDonneesIndividu",$.noop)});$(document).on("click",'button[id*\x3d"btnEnvoiAmiDetail"]',function(){ajax("/offres/recherche/detail.detailstandalone:rafraichirstatutmail",
$.noop)});$(".resultats #PopinMail, .resultats #PopinSignaler, .resultats #PopinErreurGenerique, .selection #PopinMail, .selection #PopinSignaler, .selection #PopinSupprimerSelection, .selection #PopinErreurGenerique").on("hidden.bs.modal",function(){if($("#PopinDetails").hasClass("in"))$("body").addClass("modal-open")});$(".offres.selection .media-right .btn-toggle").click();if(!isMobile.any()){$(".mrs .btn.disabled").tooltip();$("[data-tooltip]").tooltip()}$(document).on("initListeOffreAAfficher",
function(event){listeOffreAffichage=[]});return{init:init,setElementSelectedBeforeDebounce:setElementSelectedBeforeDebounce,enableTooltips:enableTooltips,chargerLBB:chargerLBB,envoyerTagDePageRecherche:envoyerTagDePageRecherche,envoiTagValidation:envoiTagValidation,ouvrirModal:ouvrirModal,ouvrirModalEnvoiAmi:ouvrirModalEnvoiAmi,setFocusAfterAfficherPlus:setFocusAfterAfficherPlus,initResizeFilter:initResizeFilter,alimenterBalisesMetadonnees:alimenterBalisesMetadonnees};function ouvrirModal(){$("#PopinEnregistrer").modal("show");
if(!$("body").hasClass("modal-open"))$("body").addClass("modal-open")}function ouvrirModalEnvoiAmi(){$("#PopinMail").modal("show");if(!$("body").hasClass("modal-open"))$("body").addClass("modal-open")}function initBoutonAfficherPlus(){$("#zoneAfficherPlus a").on("click",function(){ajouterOuRetireBlockerRecherche(true)})}function initBoutonAppliquerFiltre(){$("a[id*\x3dbtnSubmitDateCreation]").on("click",function(){ajouterOuRetireBlockerRecherche(true)});$("a[id*\x3dbtnSubmitExperience]").on("click",
function(){ajouterOuRetireBlockerRecherche(true)});$("a[id*\x3dbtnSubmitDomainePro]").on("click",function(){ajouterOuRetireBlockerRecherche(true)});$("a[id*\x3dbtnSubmitPlusDeFiltres]").on("click",function(){ajouterOuRetireBlockerRecherche(true)})}function setElementSelectedBeforeDebounce(idElement){elementSelectedBeforeDebounce=idElement}function initResizeFilter(){var resizeTimer;var filterAdjuster={movables:{$:function(){return $("[data-movable]")},singleWidth:function(){return this.$().eq(0).outerWidth(true)},
visible:function(){return this.$().filter(":visible")},hidden:function(){return this.$().filter(":hidden")},visibleWidth:function(){return this.visible().length*this.singleWidth()}},reservedSpace:function(){return this.$targetContainer.outerWidth(true)+this.$includePartners.outerWidth(true)},spaceAvailable:function(){return this.$filterContainer.width()-this.reservedSpace()},itemVisibleMax:function(){return Math.floor(this.spaceAvailable()/this.movables.singleWidth())},elementsToHide:function(){return this.movables.visible().length>
0&&this.spaceAvailable()<this.movables.visibleWidth()?this.movables.visible().length-this.itemVisibleMax():0},elementsToShow:function(){return this.movables.hidden().length>0&&this.spaceAvailable()>this.movables.visibleWidth()?this.itemVisibleMax()-this.movables.visible().length:0}};$.extend(true,filterAdjuster,{$filterContainer:$(".filter-container"),$targetContainer:$(".more-filter-container"),$includePartners:$(".include-partners")});$(window).off("resize").on("resize",function(){if(!filterAdjuster.$filterContainer.hasClass("resizing"))filterAdjuster.$filterContainer.addClass("resizing");
clearTimeout(resizeTimer);resizeTimer=setTimeout(function(){while(filterAdjuster.elementsToHide()>0){var $el=filterAdjuster.movables.visible().last();if($el.length){var $deskTopContainer=$el.find("[data-desktop-container]");if($deskTopContainer.length>=1){$deskTopContainer.find("[data-content]").attr("data-content",$deskTopContainer.attr("data-desktop-container")).prependTo(filterAdjuster.$targetContainer.find(".content").first());$el.hide()}}}while(filterAdjuster.elementsToShow()>0){var $el=filterAdjuster.movables.hidden().first();
if($el.length){var $deskTopContainer=$el.find("[data-desktop-container]");if($deskTopContainer.length>=1){$('[data-content\x3d"'+$deskTopContainer.attr("data-desktop-container")+'"]').prependTo($deskTopContainer);$el.show()}}}filterAdjuster.$targetContainer.find(".hidden-with-none").toggleClass("sr-only",filterAdjuster.movables.visible().length===0).end().find(".dropdown-menu").toggleClass("dropdown-menu-large",filterAdjuster.movables.hidden().length>0&&filterAdjuster.movables.visible().length>0).toggleClass("dropdown-menu-center",
filterAdjuster.movables.visible().length>0).toggleClass("dropdown-as-modal",filterAdjuster.movables.visible().length===0);filterAdjuster.$filterContainer.removeClass("resizing")},100)}).trigger("resize")}function init(listOffres,nombreResultats,ajoutResultatsALaListe){enableTooltips();initResizeFilter();nouveauResultat(listOffres,nombreResultats,ajoutResultatsALaListe);ajouterOuSupprimerClassResultVide(nombreResultats>0);initBoutonAfficherPlus();initBoutonAppliquerFiltre();ajouterOuRetireBlockerRecherche(false);
if(!isCriteresInsuffisants()){var div=$("div[id*\x3dzoneMessageChargement]");if(div!=null){messageChargement=document.getElementById("messageChargement");if(messageChargement==null){messageChargement=document.createElement("p");messageChargement.setAttribute("id","messageChargement");messageChargement.className="sr-only";div.append(messageChargement)}clearTimeout(timerMessageChargement);timerMessageChargement=setTimeout(function(){if(nombreResultats>1)messageChargement.innerHTML="Chargement des "+
nombreResultats+" résultats terminé";else if(nombreResultats===1)messageChargement.innerHTML="Chargement de 1 résultat terminé";else messageChargement.innerHTML="Aucune offre pour cette recherche"},1E3)}}}function initSynchronisationFormulaire(){ajouterOuRetireBlockerRecherche(false);$("body").removeClass("ajax-update");var elementForm=$("form[id*\x3drechercheForm], form[id*\x3dfiltreForm]");elementForm.off(events.form.prepareForSubmit);elementForm.on(events.form.prepareForSubmit,function(event){if(event.target.id.indexOf("rechercheForm")<
0)synchroniserRechercheFormDansFiltreForm($(this));else synchroniserFiltreFormDansRechercheForm($(this));if(!isCriteresInsuffisants()){ajouterOuRetireBlockerRecherche(true);$("body").addClass("ajax-update");var div=$("div[id*\x3dzoneMessageChargement]");if(div!=null){messageChargement=document.getElementById("messageChargement");if(messageChargement==null){messageChargement=document.createElement("p");messageChargement.setAttribute("id","messageChargement");messageChargement.className="sr-only";div.append(messageChargement)}messageChargement.innerHTML=
"Chargement des résultats en cours";timerMessageChargement=setTimeout(function(){messageChargement.innerHTML="Le chargement des résultats est toujours en cours. Veuillez patienter"},1E4)}}})}function synchroniserRechercheFormDansFiltreForm(filtreForm){ajouterOuSupprimerInputHiddenDuFormulaire(filtreForm,"motsCles",$("#idmotsCles").val());ajouterOuSupprimerInputHiddenDuFormulaire(filtreForm,"lieux",$("#idlieux").val());ajouterOuSupprimerInputHiddenDuFormulaire(filtreForm,"rayon",$("#idrayon").val());
ajouterOuSupprimerInputHiddenDuFormulaire(filtreForm,"offresPartenaires",$("#idoffresPartenaires").is(":checked"))}function synchroniserFiltreFormDansRechercheForm(rechercheForm){ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"typeContrat",recupererValeursChamps($("input:checkbox[name*\x3dtypeContrat]:checked")));ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"dureeContratMin",$("#idDureeContratMin").val());ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"dureeContratMax",
$("#idDureeContratMax").val());ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"natureOffre",recupererValeursChamps($("input:checkbox[name*\x3dContratSpecifique]:checked")));ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"dureeHebdo",recupererValeursChamps($("input:checkbox[name\x3diddureeHebdo]:checked")));ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"dureeHebdoMin",$("#idDureeHebdoMin").val());ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"dureeHebdoMax",$("#idDureeHebdoMax").val());
ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"salaireMin",$("#idsalaireBrutMinimum").val());var uniteSalaire=$("#boutonSalaire #salaireZone").text();ajouterOuSupprimerInputHiddenDuFormulaire(rechercheForm,"uniteSalaire",recupererValeurUniteSalaire(uniteSalaire))}function ajouterOuSupprimerInputHiddenDuFormulaire(formulaire,name,valeur){formulaire.find("input[type\x3dhidden][name\x3d"+name+"]").remove();if(null!=valeur&&valeur!=="")$('\x3cinput  value\x3d"'+valeur+'"  name\x3d"'+name+'" type\x3d"hidden"/\x3e').appendTo(formulaire)}
function isCriteresInsuffisants(){var motcles=$('select[id*\x3d"idmotsCles"]')[0];var lieux=$('select[id*\x3d"idlieux"]')[0];if($(motcles[0]).attr("value")||($(lieux[0]).attr("value")||$(".filters-ext").is(":visible")))return false;return true}function recupererValeursChamps(elements){return _.map(elements,function(element){return $(element).val()}).join(",")}function recupererValeurUniteSalaire(libelle){if(libelle.indexOf("Mensuel")>=0)return"M";if(libelle.indexOf("Annuel")>=0)return"A";if(libelle.indexOf("Horaire")>=
0)return"H";if(libelle.indexOf("Cachet")>=0)return"C";return"M"}function ajouterOuRetireBlockerRecherche(doitBloquer){if(doitBloquer){if(document.activeElement.id)elementSelectedBeforeDebounce=document.activeElement.id;$("a[id*\x3dbtnSubmitRechercheForm]").attr("disabled",true).attr("tabindex","-1").attr("focusable",false).attr("aria-disabled",true).attr("style","pointer-events: none;").blur()}else{$("a[id*\x3dbtnSubmitRechercheForm]").removeAttr("disabled",false).removeAttr("tabindex").removeAttr("focusable").removeAttr("aria-disabled").removeAttr("style");
if(elementSelectedBeforeDebounce){if(document.getElementById(elementSelectedBeforeDebounce)!==null)document.getElementById(elementSelectedBeforeDebounce).focus();else if($("a[id*\x3d"+elementSelectedBeforeDebounce+"]").size())$("a[id*\x3d"+elementSelectedBeforeDebounce+"]").focus();else if("btnSubmitDateCreation"===elementSelectedBeforeDebounce.substr(0,21))$("button[id*\x3dfilter-date-creation]").focus();else if("btnSubmitTypeContrat"===elementSelectedBeforeDebounce.substr(0,19))$("button[id*\x3dfilter-contrat]").focus();
else if("btnSubmitDureeHebdo"===elementSelectedBeforeDebounce.substr(0,19))$("button[id*\x3dfilter-duree-hebdo]").focus();else if("btnSubmitExperience"===elementSelectedBeforeDebounce.substr(0,19))$("button[id*\x3dfiltre-experience]").focus();else if("btnSubmitDomainePro"===elementSelectedBeforeDebounce.substr(0,19))$("button[id*\x3dfilter-domaine-pro]").focus();else if("btnSubmitPlusDeFiltres"===elementSelectedBeforeDebounce.substr(0,19))$("button[id*\x3dmore-filter]").focus();else $("a[id*\x3dbtnSubmitRechercheForm]").focus();
elementSelectedBeforeDebounce=""}}}function enableTooltips(){if(!isMobile.any())$("body").tooltip({selector:"[data-tooltip]"}).removeAttr("title")}function nouveauResultat(listOffres,nombreResultats,ajoutResultatsALaListe){selection.init("Liste_offres");if(!listeOffreAffichage)listeOffreAffichage=[];if(ajoutResultatsALaListe)listeOffreAffichage=listeOffreAffichage.concat(listOffres);else listeOffreAffichage=listOffres;setTimeout(function(){$(document).trigger("maj-resultats",{offres:listeOffreAffichage,
total:nombreResultats})},100);map.renderMap(null,listeOffreAffichage,nombreResultats,null)}function ajouterOuSupprimerClassResultVide(isResultatVide){if(isResultatVide)$(".zone-resultats").first().removeClass("vide");else $(".zone-resultats").first().addClass("vide");if($(".filters-ext").is(":visible")){$('button[id*\x3d"boutonEnregistrerRecherche"]').attr("disabled",true);$('button[id*\x3d"boutonEnregistrerRecherche"]').attr("title","Cette recherche d’offres ne peut pas être enregistrée")}}function valueOrEmptyString(value){return value==
undefined?"":value}function valueOrEmptyTab(tab){return tab==undefined?[]:tab}function chargerLBB(motsClefs,lieu,rayon){ajax("/offres/recherche.rechercheoffre.bloclbb:chargerLBB?motsclefs\x3d"+encodeURI(motsClefs)+"\x26lieu\x3d"+encodeURI(lieu)+"\x26rayon\x3d"+encodeURI(rayon),{element:$("#lbbContentZone"),success:function(response){$("#lbbContentZone").text(response.json.origin)}})}function setFocusAfterAfficherPlus(idOffre){var elementToFocus=$(".result[data-id-offre\x3d"+idOffre+"] a");if(elementToFocus.length)elementToFocus[0].focus()}
function envoyerTagDePageRecherche(chapter1,name,motcles,lieux,distance,nombreResultats,authent){tc_vars=tc_vars||{};tc_vars.customVars=tc_vars.customVars||{techno:"Tapestry",client:"Candidat",ident:authent,pn:"pn055"};tc_vars.name=name;tc_vars.chapters=tc_vars.chapters||[];tc_vars.chapters=[chapter1],tc_vars.customObjects=tc_vars.customObjects||{};tc_vars.level2=91;if(nombreResultats!==null&&nombreResultats!==undefined)if(nombreResultats===0)tc_vars.customObjects.trancheNbResult=0;else if(nombreResultats>
10)tc_vars.customObjects.trancheNbResult=2;else tc_vars.customObjects.trancheNbResult=1;if(!lieux)distance=undefined;tc_vars.customObjects.lieuTravail=lieux;tc_vars.customObjects.metier=motcles;tc_vars.customObjects.distance=distance;tc_vars.customObjects.motif=$('input:radio[name\x3d"radioGroupMotifs"]:checked').val();tc_vars.type="page";if(window.tC&&(tC.event&&tC.event.tag))tC.event.tag();else window.tagEnAttente.push(JSON.parse(JSON.stringify(tc_vars)));tc_vars.type=""}function envoiTagValidation(avecMail){if(avecMail)tagDeClick({name:"Valider_avec_alerte_mail",
chapter1:"Liste_offres",chapter2:"Enregistrer_recherche",type:"action",level2:"91"});else tagDeClick({name:"Valider_sans_alerte_mail",chapter1:"Liste_offres",chapter2:"Enregistrer_recherche",type:"action",level2:"91"})}function alimenterBalisesMetadonnees(json){var script=document.createElement("script");script.type="application/ld+json";script.innerHTML=json;var elementScriptExistant=document.head.querySelector('script[type\x3d"application/ld+json"]');if(elementScriptExistant)elementScriptExistant.remove();
document.head.appendChild(script)}})}).call(this);