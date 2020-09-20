<?php
   header( 'Content-Type:text/html;charset=utf-8 '); 
      # 接受前端的用户信息;
      $email = $_GET["email"];
      $password = $_GET["password"];

      # 链接数据库 ， 比对数据库之中是否存在这条信息;
      # 1. 建立链接
      $con = mysql_connect("localhost", "root" , "root");
      # 2. 选择数据库 
      mysql_select_db("gz2005");
      mysql_query("set names utf8");
      # 3. 操作数据库
      // 1. 编写 sql 语句;
      // 2. php的API去执行sql语句; 
      // - 字段名需要使用 `` 引起来 
      // - 关键字要大写
      $sql = 'SELECT `email` FROM `user` WHERE `email`="'.$email.'" AND `password`="'.$password.'"';

      $res = mysql_query($sql);
      // # 4. 把返回的资源类型进行遍历处理
      $arr = mysql_fetch_array( $res );
      mysql_close($con);
      // # 如果在数据库之中存在这条数据表示登录成功;
      if($arr){
         # 登录成功
         die('{"type":"success"}');
      }else{
         # 登录失败;
         die('{"type":"error"}');
      }
?>