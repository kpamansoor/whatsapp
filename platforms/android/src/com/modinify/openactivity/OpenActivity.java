package com.modinify.openactivity;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.mansoor.whatsapp.CallActivity;

public class OpenActivity extends CordovaPlugin{

    private static CallbackContext _callbackContext;

    public static CallbackContext getCallbackContext(){
        return _callbackContext;
    }

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Context context=this.cordova.getActivity().getApplicationContext();
        boolean isOk = false;
        _callbackContext = callbackContext;
//        Log.d("plugin","------------------------------------------"+args.toString());
        try{
            Class<?> c = Class.forName(action);
            Intent intent=new Intent(context, c);
            intent.putExtra("c", args.toString());
            cordova.getActivity().startActivity(intent);
            isOk = true;
        }catch(Exception e){
            callbackContext.error(e.getMessage());
            // DO nothing for while...
        }

        return isOk;
    }

}