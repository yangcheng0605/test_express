  //                             _ooOoo_
  //                            o8888888o
  //                            88" . "88
  //                            (| -_- |)
  //                            O\  =  /O
  //                         ____/`---'\____
  //                       .'  \\|     |//  `.
  //                      /  \\|||  :  |||//  \
  //                     /  _||||| -:- |||||_  \
  //                     |   | \\\  -  /'| |   |
  //                     | \_|  `\`---'//  |_/ |
  //                     \  .-\__ `-. -'__/-.  /
  //                   ___`. .'  /--.--\  `. .'___
  //                ."" '<  `.___\_<|>_/___.' _> \"".
  //               | | :  `- \`. ;`. _/; .'/ /  .' ; |    Tank
  //               \  \ `-.   \_\_`. _.'_/_/  -' _.' /
  // ================-.`___`-.__\ \___  /__.-'_.'_.-'================
  //                             `=--=-'                  

  //                  佛祖保佑    永无BUG    永不宕机

  //   controller
  import { UserController } from "./users/controller";

  //   model
  import { Users } from "./users/model";
  
  // api控制器集合
  export const ApiController = [
    UserController,
  ];
  // 实体集合
  export const Entities = [
    Users
  ];
  