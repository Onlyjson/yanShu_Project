/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>//weiixn
#import "RCTBaiduMapViewManager.h"//百度地图定位
#import "SplashScreen.h" //启动页
#import "AlipayModule.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  //模拟器
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  //上线
  //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
#if DEBUG
  //模拟器测试
  jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
  //真机测试192.168.1.115 192.168.43.169    192.168.1.28
  //jsCodeLocation = [NSURL URLWithString:@"http://192.168.43.84:8081/index.ios.bundle?platform=ios&dev=true"];
#else
  //  jsCodeLocation=[RCTHotUpdate bundleURL];
#endif
  //百度地图
  [RCTBaiduMapViewManager initSDK:@"l045F0S8g5Vj5m9Oj1r543OlDMURRaqL"];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"HomeRange"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [SplashScreen show];
  return YES;
}

//微信分享和支付以及支付宝支付
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
  if([[sourceApplication substringToIndex:10] isEqualToString:@"com.alipay"]){
    [AlipayModule handleCallback:url];
  }
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}


@end
