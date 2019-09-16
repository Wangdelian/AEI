/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.utils.mail
 *文件名：  MailTest 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-08-13 10:24
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-08-13 10:24
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.utils.mail;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class MailTest {
    public static void TestSendHtml() {
        SimpleMailSender ss = new SimpleMailSender();
        List<String> tos = new ArrayList<String>();
        tos.add("***@sina.com");
        ss.createMail();
        ss.setSubject("一封复杂的邮件");
        ss.setTo(tos);
        ss.addContent("测试一封复杂的邮件");
        //加载图片
        ss.addImage(new File("l.jpg"));
        //加载html内容
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(
                    new FileInputStream(new File("404.html")), "utf-8"));
            String html = "";
            String line = null;
            while ((line = reader.readLine()) != null) {
                html += line;
            }
            ss.addHtml(html);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(reader != null){
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        //加载附件
        ss.addAttach(new File("attach.txt"));
        ss.sendMail();
    }

    public static void TestSendText() {
        SimpleMailSender ss = new SimpleMailSender();
        List<String> tos = new ArrayList<String>();
        tos.add("daixirui@163.com");
        ss.createMail();
        ss.setSubject("一封测试邮件(纯文本)2");
        ss.addContent("测试test");
        ss.setTo(tos);
        ss.sendMail();
    }


}
