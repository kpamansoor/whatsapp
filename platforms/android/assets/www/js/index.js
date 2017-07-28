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

 function initAds() {
     if (admob) {
         var adPublisherIds = {
             ios: {
                 banner: "ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB",
                 interstitial: "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
             },
             android: {
                 banner: "ca-app-pub-1243068719441957/4844840227",
                 interstitial: "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII"
             }
         };

         var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

         admob.setOptions({
             publisherId: admobid.banner,
             interstitialAdId: admobid.interstitial,
             tappxIdiOS: "/XXXXXXXXX/Pub-XXXX-iOS-IIII",
             tappxIdAndroid: "ca-app-pub-1243068719441957~1891373820",
             tappxShare: 0.5,
             isTesting: true,

         });

         registerAdEvents();

     } else {
         alert('AdMobAds plugin not ready');
     }
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

 // optional, in case respond to events
 function registerAdEvents() {
     document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
     document.addEventListener(admob.events.onAdFailedToLoad, function (e) {});
     document.addEventListener(admob.events.onAdOpened, function (e) {});
     document.addEventListener(admob.events.onAdClosed, function (e) {});
     document.addEventListener(admob.events.onAdLeftApplication, function (e) {});
     document.addEventListener(admob.events.onInAppPurchaseRequested, function (e) {});

     document.addEventListener("pause", onPause, false);
     document.addEventListener("resume", onResume, false);
 }

 function onDeviceReady() {
     document.removeEventListener('deviceready', onDeviceReady, false);
     initAds();

     // display a banner at startup
     //     admob.createBannerView();

     // request an interstitial
     //admob.requestInterstitialAd();
     setTimeout(function () {
         //         admob.requestInterstitialAd();
     }, 10000);

     $('#send').addClass('disable_click');
     $('#send').attr('disabled', true);
 }

 document.addEventListener("deviceready", onDeviceReady, false);

 $('#number').keyup(function () {

     if (/^\d{12,14}$/.test($("#number").val())) {

         $('#number').removeClass('red_text');
         $('#number').addClass('green_text');

         $('#send').removeClass('disable_click');
         $('#send').attr('disabled', false);
     } else {

         $('#number').removeClass('green_text');
         $('#number').addClass('red_text');

         $('#send').addClass('disable_click');
         $('#send').attr('disabled', true);
     }

 });
