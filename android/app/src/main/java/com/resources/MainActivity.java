package com.resources;

import com.facebook.react.ReactActivity;
// React Navigation
// Add For ReactNavigation Drawer
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.content.Intent;
public class MainActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "resources";
  }

  // Add For ReactNavigation Drawer
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
