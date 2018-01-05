package com.mansoor.whatsapp;

import android.Manifest;
import android.app.Activity;
import android.app.ProgressDialog;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Handler;
import android.provider.Contacts;
import android.provider.ContactsContract;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.view.Window;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.Random;

public class CallActivity extends Activity {

    private static final String TAG = "";
    final Handler handler = new Handler();
    final Intent intent = new Intent();
    String name,number,type;
    ProgressDialog myProgressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_call);
        try {
            JSONArray ja = new JSONArray(getIntent().getStringExtra("c"));
            type = ja.get(0).toString();
            number = ja.get(1).toString();
            ActivityCompat.requestPermissions(CallActivity.this,
                    new String[]{Manifest.permission.READ_CONTACTS, Manifest.permission.WRITE_CONTACTS},
                    1);
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case 1: {
                myProgressDialog = ProgressDialog.show(CallActivity.this, "", "initializing call...", true);
                myProgressDialog.show();

                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    intent.setAction(Intent.ACTION_VIEW);
                    Uri str = addContact("WhatsApp", number);
                    name = getContactName(number, CallActivity.this);

                    check();
                } else {

                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                    Toast.makeText(CallActivity.this, "Permission denied ", Toast.LENGTH_SHORT).show();
                    finish();
                }
                return;
            }

            // other 'case' lines to check for other
            // permissions this app might request
        }
    }

    private void check() {

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                int videocall = 0;
                if(type.equals("v"))
                    videocall = getContactIdForWhatsAppVideoCall(name, CallActivity.this);
                else if(type.equals("a"))
                    videocall = getContactIdForWhatsAppCall(name, CallActivity.this);

                if (videocall != 0) {
                    myProgressDialog.dismiss();
                    if(type.equals("v"))
                        intent.setDataAndType(Uri.parse("content://com.android.contacts/data/" + videocall),
                            "vnd.android.cursor.item/vnd.com.whatsapp.video.call");
                    else if(type.equals("a"))
                        intent.setDataAndType(Uri.parse("content://com.android.contacts/data/" + videocall),
                                "vnd.android.cursor.item/vnd.com.whatsapp.voip.call");
                    intent.setPackage("com.whatsapp");
                    startActivity(intent);
                } else
                    check();
            }
        }, 5000);
    }

    private Uri addContact(String name, String phone) {
        ContentValues values = new ContentValues();
        values.put(Contacts.People.NUMBER, phone);
        values.put(Contacts.People.TYPE, ContactsContract.CommonDataKinds.Phone.TYPE_CUSTOM);
        values.put(Contacts.People.LABEL, name);
        values.put(Contacts.People.NAME, name);
        Uri dataUri = getContentResolver().insert(Contacts.People.CONTENT_URI, values);
        Uri updateUri = Uri.withAppendedPath(dataUri, Contacts.People.Phones.CONTENT_DIRECTORY);
        values.clear();
        values.put(Contacts.People.Phones.TYPE, Contacts.People.TYPE_MOBILE);
        values.put(Contacts.People.NUMBER, phone);
        updateUri = getContentResolver().insert(updateUri, values);
        return updateUri;
    }

    private void deleteContact(){
        ContentResolver cr = getContentResolver();
        Cursor cur = cr.query(ContactsContract.Contacts.CONTENT_URI,
                null, null, null, null);
        while (cur.moveToNext()) {
            try{
                String lookupKey = cur.getString(cur.getColumnIndex(ContactsContract.Contacts.LOOKUP_KEY));
                Uri uri = Uri.withAppendedPath(ContactsContract.Contacts.CONTENT_LOOKUP_URI, lookupKey);
                System.out.println("The uri is " + uri.toString());
                cr.delete(uri, null, null);
            }
            catch(Exception e)
            {
                System.out.println(e.getStackTrace());
            }
        }
    }

    public static int getContactIDFromNumber(String contactNumber, Context context) {
        contactNumber = Uri.encode(contactNumber);
        int phoneContactID = new Random().nextInt();
        Cursor contactLookupCursor = context.getContentResolver().query(Uri.withAppendedPath(ContactsContract.PhoneLookup.CONTENT_FILTER_URI, contactNumber), new String[]{ContactsContract.PhoneLookup.DISPLAY_NAME, ContactsContract.PhoneLookup._ID}, null, null, null);
        while (contactLookupCursor.moveToNext()) {
            phoneContactID = contactLookupCursor.getInt(contactLookupCursor.getColumnIndexOrThrow(ContactsContract.PhoneLookup._ID));
        }
        contactLookupCursor.close();

        return phoneContactID;
    }

    public String getContactName(final String phoneNumber, Context context) {
        Uri uri = Uri.withAppendedPath(ContactsContract.PhoneLookup.CONTENT_FILTER_URI, Uri.encode(phoneNumber));

        String[] projection = new String[]{ContactsContract.PhoneLookup.DISPLAY_NAME};

        String contactName = "";
        Cursor cursor = context.getContentResolver().query(uri, projection, null, null, null);

        if (cursor != null) {
            if (cursor.moveToFirst()) {
                contactName = cursor.getString(0);
            }
            cursor.close();
        }

        return contactName;
    }


    public int getContactIdForWhatsAppCall(String name, Context context) {

        Cursor cursor = getContentResolver().query(
                ContactsContract.Data.CONTENT_URI,
                new String[]{ContactsContract.Data._ID},
                ContactsContract.Data.DISPLAY_NAME + "=? and " + ContactsContract.Data.MIMETYPE + "=?",
                new String[]{name, "vnd.android.cursor.item/vnd.com.whatsapp.voip.call"},
                ContactsContract.Contacts.DISPLAY_NAME);

        if (cursor.getCount() > 0) {
            cursor.moveToNext();
            int phoneContactID = cursor.getInt(cursor.getColumnIndex(ContactsContract.Data._ID));
            System.out.println("9999999999999999          name  " + name + "      id    " + phoneContactID);
            return phoneContactID;
        } else {
            System.out.println("8888888888888888888          ");
            return 0;
        }
    }

    public int getContactIdForWhatsAppVideoCall(String name, Context context) {
        Cursor cursor = getContentResolver().query(
                ContactsContract.Data.CONTENT_URI,
                new String[]{ContactsContract.Data._ID},
                ContactsContract.Data.DISPLAY_NAME + "=? and " + ContactsContract.Data.MIMETYPE + "=?",
                new String[]{name, "vnd.android.cursor.item/vnd.com.whatsapp.video.call"},
                ContactsContract.Contacts.DISPLAY_NAME);

        if (cursor.getCount() > 0) {
            cursor.moveToFirst();
            int phoneContactID = cursor.getInt(cursor.getColumnIndex(ContactsContract.Data._ID));
            return phoneContactID;
        } else {
            System.out.println("8888888888888888888          ");
            return 0;
        }
    }


}
