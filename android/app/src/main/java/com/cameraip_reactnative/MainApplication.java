package com.cameraip_reactnative;
import android.content.res.Configuration;

// install expo
// import android.content.res.Configuration;
// import expo.modules.ApplicationLifecycleDispatcher;
// import expo.modules.ReactNativeHostWrapper;

// react-native-camera
import org.reactnative.camera.RNCameraPackage;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.cameraip_reactnative.newarchitecture.MainApplicationReactNativeHost;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

// React Native Orientation
import com.github.yamill.orientation.OrientationPackage;

// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage; 


public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      // install expo  
      // new ReactNativeHostWrapper(this, new ReactNativeHost(this) {
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());

          // React Native Orientation
          // packages.add(new OrientationPackage());

          // rn-fetch-blob
          // packages.add(new RNFetchBlobPackage());

          // react-native-camera
          // packages.add(new RNCameraPackage());

          // install expo
          // packages.add(new MyReactNativePackage());
          
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

      //install expo
      // });

  private final ReactNativeHost mNewArchitectureNativeHost =
    //install expo
    // new ReactNativeHostWrapper(this, new MainApplicationReactNativeHost(this));

    new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {

    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }

    // install expo 
    // ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    // SoLoader.init(this, /* native exopackage */ false);
    // initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    // ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

    // install expo 
    // ApplicationLifecycleDispatcher.onApplicationCreate(this);
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.cameraip_reactnative.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  // install expo
  // @Override
  // public void onConfigurationChanged(Configuration newConfig) {
  //   super.onConfigurationChanged(newConfig);
  //   ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig);
  // }
}
