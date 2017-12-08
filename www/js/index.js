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
         isTesting: true
     });
     if(AdMob) AdMob.createBanner({
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true });
     
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
    // cordova.plugins.clipboard.copy("hell");
    //cordova.plugins.clipboard.paste(function (text) { alert(text); });
     initAds();
     setTimeout(function () {
        navigator.splashscreen.hide();
        cordova.plugins.clipboard.paste(function (text) {
            if(/^([+])?\d{11,13}$/.test(text)){
                if(confirm("A mobile number "+text+" found in clipboard. Do you want to copy? ")){
                    $('#number').val(text);
                    $("#number").trigger("input");
                    updateLink();
                }
            }
         });
     }, 1000);
     setTimeout(function () {
        // show the interstitial later, e.g. at end of game level
        if (AdMob) AdMob.showInterstitial();

    }, 10000);
   
     $('#send').addClass('disable_click');
     $('#send').attr('disabled', true);
 }

 document.addEventListener("deviceready", onDeviceReady, false);
 document.addEventListener("backbutton", function () {
     if ($('#myModal').is(':visible')) {
         $('#myModal').modal('toggle');
     } else {
         navigator.app.exitApp();
     }
 }, false);
 $('#hint').hide();
 $('#number').on('input',function () {

     if (/^([+])?\d{11,13}$/.test($("#number").val())) {

         $('#number').removeClass('red_text');
         $('#number').addClass('green_text');

         $('#send').removeClass('disable_click');
         $('#send').attr('disabled', false);
         $('#hint').hide();
     } else {

         $('#number').removeClass('green_text');
         $('#number').addClass('red_text');

         $('#send').addClass('disable_click');
         $('#send').attr('disabled', true);

         $('#hint').show();
     }

 });