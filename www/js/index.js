 var link = "";

 function updateLink(x, y) {
     link = "https://api.whatsapp.com/send?phone=" + $('input#number').val() + "&text=" + $('textarea#message').val();
     var a = document.getElementById('send'); //or grab it by tagname etc
     a.href = link;
 }


 $("#number, #message").on("change paste keyup", function () {
     updateLink();
 });

 var isAppForeground = true;
 var admobid = {};

 function makeCall(type) {

     OpenActivity.open('com.mansoor.whatsapp.CallActivity', type, $('input#number').val(), function () {
             // Call back OK
         },
         function () {
             // / Call back ERROR
         });
 }

 function initAds() {


     if (/(android)/i.test(navigator.userAgent)) { // for android & amazon-fireos
         admobid = {
             banner: 'ca-app-pub-1243068719441957/8725675322', // or DFP format "/6253334/dfp_example_ad"
             interstitial: 'ca-app-pub-1243068719441957/1225447490'
         };
     } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
         admobid = {
             banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
             interstitial: 'ca-app-pub-xxx/kkk'
         };
     } else { // for windows phone
         admobid = {
             banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
             interstitial: 'ca-app-pub-xxx/kkk'
         };
     }

     if (AdMob) AdMob.prepareInterstitial({
         adId: admobid.interstitial,
         autoShow: false,
         isTesting: false
     });
     if (AdMob) AdMob.createBanner({
         adId: admobid.banner,
         position: AdMob.AD_POSITION.BOTTOM_CENTER,
         autoShow: true
     });

 }

 function onAdLoaded(e) {
     if (isAppForeground) {
         if (e.adType === admob.AD_TYPE.INTERSTITIAL) {
             console.log("An interstitial has been loaded and autoshown. If you want to load the interstitial first and show it later, set 'autoShowInterstitial: false' in admob.setOptions() and call 'admob.showInterstitialAd();' here");
         } else if (e.adType === admob.AD_TYPE_BANNER) {
             console.log("New banner received");
         }
     }
 }

 function onPause() {
     if (isAppForeground) {
         admob.destroyBannerView();
         isAppForeground = false;
     }
 }

 function onResume() {
     if (!isAppForeground) {
         setTimeout(admob.createBannerView, 1);
         //setTimeout(admob.requestInterstitialAd, 1);
         isAppForeground = true;
     }
 }


 function onDeviceReady() {
     initAds();
     setTimeout(function () {
<<<<<<< HEAD
        navigator.splashscreen.hide();
        cordova.plugins.clipboard.paste(function (text) {
            if(/^([+])?\d{11,13}$/.test(text)){
                text = text.replace("+","");
                text = text.replace("-","");
                if(confirm("A mobile number "+text+" found in clipboard. Do you want to copy? ")){
                    $('#number').val(text);
                    $("#number").trigger("input");
                    updateLink();
                }
            }
=======
         navigator.splashscreen.hide();
         cordova.plugins.clipboard.paste(function (text) {
             if (/^([+])?\d{11,13}$/.test(text)) {
                 if (confirm("A mobile number " + text + " found in clipboard. Do you want to copy? ")) {
                     $('#number').val(text.replace("+", ""));
                     $("#number").trigger("input");
                     updateLink();
                 }
             }
>>>>>>> 22edca19eb9156b4659f79274f9d34b550ba81af
         });
     }, 1000);
     setTimeout(function () {
         // show the interstitial later, e.g. at end of game level
         if (AdMob) AdMob.showInterstitial();

     }, 10000);

     $('#send').addClass('disable_click');
     $('#send').attr('disabled', true);
     $('#callBtn').addClass('disable_click');
     $('#callBtn').attr('disabled', true);
     $('#videoBtn').addClass('disable_click');
     $('#videoBtn').attr('disabled', true);

     $("#callLog").click(function (e) {
         var permissions = cordova.plugins.permissions;
         permissions.hasPermission(permissions.READ_CALL_LOG, function (status) {
             if (status.hasPermission) {
                 readCallLog();
             } else {
                 permissions.requestPermission(permissions.READ_CALL_LOG, success, error);

                 function error() {
                     alert('Call log permission is not turned on');
                 }

                 function success(status) {
                     if (status.hasPermission) {
                         readCallLog();
                     }
                 }
             }
         });
     });



     function readCallLog() {
         var firstCall = 0;
         var lastCall = 20;
         calls.getCalls(function (res) {
             $('#callLogsModal').modal('toggle');
             console.log(res);
             var calls = JSON.parse(res);
             update_list(calls);
             for (i = 0; i < calls.length; i++) {
                 var tel = calls[i].phoneNumber;
                 var type = calls[i].type;
                 var date = calls[i].date;
                 var caller = calls[i].caller;
             }
         }, function (error) {
             console.log(error);
         }, "", "", [firstCall, lastCall]);
     }

     function update_list(calls) {

         // clear the existing list
         $('.list-group li').remove();
         var str = '';

         $.each(calls, function (index, call) {
             if (call.type == "MISSED")
                 str = '<li class="list-group-item" onclick="callLogSelected(\'' + call.phoneNumber + '\');return false">' + call.phoneNumber + '<span class="label label-danger" style="float: right;">' + call.type + '</span>';
             else if (call.type == "INCOMING")
                 str = '<li class="list-group-item" onclick="callLogSelected(\'' + call.phoneNumber + '\');return false">' + call.phoneNumber + '<span class="label label-primary" style="float: right;">' + call.type + '</span>';
             else if (call.type == "OUTGOING")
                 str = '<li class="list-group-item" onclick="callLogSelected(\'' + call.phoneNumber + '\');return false">' + call.phoneNumber + '<span class="label label-warning" style="float: right;">' + call.type + '</span>';

             if (call.caller != undefined)
                 str += '<br><span style="font-size:0.7em">' + call.caller + '</span></li>';
             else
                 str += '<br><span style="font-size:0.7em">Unknown number</span></li>';
             $('.list-group').append(str);
         });

     }
 }

 function callLogSelected(phoneNumber) {
     $('#callLogsModal').modal('toggle');
     $('#number').val(phoneNumber.replace("+", ""));
     $("#number").trigger("input");
     updateLink();
 }

 function onBackKeyDown() {
     if ($('#callLogsModal').is(':visible')) {
         $('#callLogsModal').modal('toggle');
         e.preventDefault();
     }
 }

 document.addEventListener("backbutton", onBackKeyDown, false);
 document.addEventListener("deviceready", onDeviceReady, false);
 document.addEventListener("backbutton", function () {
     if ($('#myModal').is(':visible')) {
         $('#myModal').modal('toggle');
     } else {
         navigator.app.exitApp();   
     }
 }, false);
 $('#hint').hide();
 $('#number').on('input', function () {

     if (/^([+])?\d{11,13}$/.test($("#number").val())) {

         $('#number').removeClass('red_text');
         $('#number').addClass('green_text');

         $('#send').removeClass('disable_click');
         $('#send').attr('disabled', false);
         $('#callBtn').removeClass('disable_click');
         $('#callBtn').attr('disabled', false);
         $('#videoBtn').removeClass('disable_click');
         $('#videoBtn').attr('disabled', false);
         $('#hint').hide();
     } else {

         $('#number').removeClass('green_text');
         $('#number').addClass('red_text');

         $('#send').addClass('disable_click');
         $('#send').attr('disabled', true);
         $('#callBtn').addClass('disable_click');
         $('#callBtn').attr('disabled', true);
         $('#videoBtn').addClass('disable_click');
         $('#videoBtn').attr('disabled', true);

         $('#hint').show();
     }

 });