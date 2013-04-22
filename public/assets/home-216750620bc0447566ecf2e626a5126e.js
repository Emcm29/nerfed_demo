function updateCountry(){for(var e=select_dialect.options.length-1;e>=0;e--)select_dialect.remove(e);for(var t=langs[select_language.selectedIndex],e=1;t.length>e;e++)select_dialect.options.add(new Option(t[e][1],t[e][0]));select_dialect.style.visibility=1==t[1].length?"hidden":"visible"}function upgrade(){start_button.style.visibility="hidden",showInfo("info_upgrade")}function linebreak(e){return e.replace(two_line,"<p></p>").replace(one_line,"<br>")}function capitalize(e){return e.replace(first_char,function(e){return e.toUpperCase()})}function createEmail(){var e=final_transcript.indexOf("\n");(0>e||e>=80)&&(e=40+final_transcript.substring(40).indexOf(" "));var t=encodeURI(final_transcript.substring(0,e)),n=encodeURI(final_transcript.substring(e+1));window.location.href="mailto:?subject="+t+"&body="+n}function copyButton(){recognizing&&(recognizing=!1,recognition.stop()),copy_button.style.display="none",copy_info.style.display="inline-block",showInfo("")}function emailButton(){recognizing?(create_email=!0,recognizing=!1,recognition.stop()):createEmail(),email_button.style.display="none",email_info.style.display="inline-block",showInfo("")}function startButton(e){return recognizing?(recognition.stop(),void 0):($.post("/ctranslates",{derp:"derp"}),derp_transcript="",derp_span.inner="",final_transcript="",recognition.lang=select_dialect.value,recognition.start(),ignore_onend=!1,final_span.innerHTML="",interim_span.innerHTML="",start_img.src="/intl/en/chrome/assets/common/images/content/mic-slash.gif",showInfo("info_allow"),showButtons("none"),start_timestamp=e.timeStamp,void 0)}function showInfo(e){if(e){for(var t=info.firstChild;t;t=t.nextSibling)t.style&&(t.style.display=t.id==e?"inline":"none");info.style.visibility="visible"}else info.style.visibility="hidden"}function showButtons(e){e!=current_style&&(current_style=e,copy_button.style.display=e,email_button.style.display=e,copy_info.style.display="none",email_info.style.display="none")}function get_lang_code(e){return"English"==e?"en":e}for(var langs=[["Afrikaans",["af-ZA"]],["Bahasa Indonesia",["id-ID"]],["Bahasa Melayu",["ms-MY"]],["Català",["ca-ES"]],["Čeština",["cs-CZ"]],["Deutsch",["de-DE"]],["English",["en-AU","Australia"],["en-CA","Canada"],["en-IN","India"],["en-NZ","New Zealand"],["en-ZA","South Africa"],["en-GB","United Kingdom"],["en-US","United States"]],["Español",["es-AR","Argentina"],["es-BO","Bolivia"],["es-CL","Chile"],["es-CO","Colombia"],["es-CR","Costa Rica"],["es-EC","Ecuador"],["es-SV","El Salvador"],["es-ES","España"],["es-US","Estados Unidos"],["es-GT","Guatemala"],["es-HN","Honduras"],["es-MX","México"],["es-NI","Nicaragua"],["es-PA","Panamá"],["es-PY","Paraguay"],["es-PE","Perú"],["es-PR","Puerto Rico"],["es-DO","República Dominicana"],["es-UY","Uruguay"],["es-VE","Venezuela"]],["Euskara",["eu-ES"]],["Français",["fr-FR"]],["Galego",["gl-ES"]],["Hrvatski",["hr_HR"]],["IsiZulu",["zu-ZA"]],["Íslenska",["is-IS"]],["Italiano",["it-IT","Italia"],["it-CH","Svizzera"]],["Magyar",["hu-HU"]],["Nederlands",["nl-NL"]],["Norsk bokmål",["nb-NO"]],["Polski",["pl-PL"]],["Português",["pt-BR","Brasil"],["pt-PT","Portugal"]],["Română",["ro-RO"]],["Slovenčina",["sk-SK"]],["Suomi",["fi-FI"]],["Svenska",["sv-SE"]],["Türkçe",["tr-TR"]],["български",["bg-BG"]],["Pусский",["ru-RU"]],["Српски",["sr-RS"]],["한국어",["ko-KR"]],["中文",["cmn-Hans-CN","普通话 (中国大陆)"],["cmn-Hans-HK","普通话 (香港)"],["cmn-Hant-TW","中文 (台灣)"],["yue-Hant-HK","粵語 (香港)"]],["日本語",["ja-JP"]],["Lingua latīna",["la"]]],i=0;langs.length>i;i++)select_language.options[i]=new Option(langs[i][0],i);select_language.selectedIndex=6,updateCountry(),select_dialect.selectedIndex=6,showInfo("info_start");var create_email=!1,final_transcript="",recognizing=!1,ignore_onend,start_timestamp;if("webkitSpeechRecognition"in window){start_button.style.display="inline-block";var recognition=new webkitSpeechRecognition;recognition.continuous=!0,recognition.interimResults=!0,recognition.onstart=function(){recognizing=!0,showInfo("info_speak_now"),start_img.src="/intl/en/chrome/assets/common/images/content/mic-animate.gif"},recognition.onerror=function(e){"no-speech"==e.error&&(start_img.src="/intl/en/chrome/assets/common/images/content/mic.gif",showInfo("info_no_speech"),ignore_onend=!0),"audio-capture"==e.error&&(start_img.src="/intl/en/chrome/assets/common/images/content/mic.gif",showInfo("info_no_microphone"),ignore_onend=!0),"not-allowed"==e.error&&(100>e.timeStamp-start_timestamp?showInfo("info_blocked"):showInfo("info_denied"),ignore_onend=!0)},recognition.onend=function(){if(recognizing=!1,!ignore_onend){if(start_img.src="/intl/en/chrome/assets/common/images/content/mic.gif",!final_transcript)return showInfo("info_start"),void 0;if(showInfo(""),window.getSelection){window.getSelection().removeAllRanges();var e=document.createRange();e.selectNode(document.getElementById("final_span")),window.getSelection().addRange(e)}create_email&&(create_email=!1,createEmail())}};var num=0;recognition.onresult=function(e){var t="";if("undefined"==typeof e.results)return recognition.onend=null,recognition.stop(),upgrade(),void 0;for(var n=e.resultIndex;e.results.length>n;++n)e.results[n].isFinal?(final_transcript+=e.results[n][0].transcript,derp_transcript=e.results[n][0].transcript,num+=1,$.post("/ctranslates/update",{text:derp_transcript,count:num}),$("#results-trans").load("ctranslates/new")):t+=e.results[n][0].transcript;final_transcript=capitalize(final_transcript),final_span.innerHTML=linebreak(final_transcript),derp_span.innerHTML=derp_transcript+num,interim_span.innerHTML=linebreak(t),(final_transcript||t)&&showButtons("inline-block")}}else upgrade();var two_line=/\n\n/g,one_line=/\n/g,first_char=/\S/,current_style;