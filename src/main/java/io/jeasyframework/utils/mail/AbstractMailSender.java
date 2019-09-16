/*******************************************************
 *Copyright (c) 2017 All Rights Reserved.
 *JDK版本： 1.8
 *公司名称：
 *命名空间：io.jeasyframework.utils.mail
 *文件名：  AbstractMailSender 
 *版本号：  V1.0.0.0
 *创建人：  daixirui
 *电子邮箱：daixirui@live.com
 *创建时间：2018-08-13 10:17
 *描述：
 *
 *=====================================================
 *修改标记
 *修改时间：2018-08-13 10:17
 *修改人：  daixirui
 *版本号：  V1.0.0.0
 *描述：
 *
 /******************************************************/
package io.jeasyframework.utils.mail;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public abstract class AbstractMailSender {

    /*
     *静态量， properties 配置文件中对应的变量名
     */
    private static final String PROTOCOL = "smtp";//类型
    private static final String HOST = "smtp.qiye.aliyun.com";//smtp服务地址
    private static final String PORT = "25";//端口
    private static final String FROM = "gis@gis.caf.so";//设置发件人
    private static final String USERNAME = "gis@gis.caf.so";//设置发件人账号
    private static final String PASSWORD = "Microid123*";//发件人密码
    private static final String VALIDATE = "true";//验证标识
    private static final String DEBUG = "true";//
    private static final String VPASSWORD = "Microid123*"; //授权码

    /*
     *163配置
     */
    /*private static final String PROTOCOL = "smtp";
    private static final String HOST = "smtp.163.com";
    private static final String PORT = "25";
    private static final String FROM = "dxralpha@163.com";
    private static final String USERNAME = "dxralpha@163.com";
    private static final String PASSWORD = "ryan1234";
    private static final String VALIDATE = "true";
    private static final String DEBUG = "true";
    private static final String VPASSWORD = "Ryan1234";
    */

    private static final String vPROTOCOL = "mail.transport.protocol"; //类型参数名称
    private static final String vHOST = "mail.smtp.host";//SMTP参数名称
    private static final String vPORT = "mail.smtp.port";//端口参数名称
    private static final String vFROM = "mail.smtp.from";//发件人配置名称
    private static final String vUSERNAME = "mail.smtp.user";//发件人账号配置名称
    private static final String vPASSWORD = "mail.smtp.password";//发件人密码配置名称
    private static final String vVALIDATE = "mail.smtp.auth";//发件人授权码配置名称
    private static final String vDEBUG = "mail.debug";//

    private static Properties configs = new Properties(); //properties 配置文件
    private static Properties props = new Properties(); //创建 Session 实例时需要传递的基本参数
    private static Authenticator authenticator; // 创建 Session 实例时需要传递的认证参数

    private Session session;
    protected Message message;

    /**
     * 初始化静态量
     */
    static {
        /*InputStream inputStream = AbstractMailSender.class
                .getResourceAsStream("mail.properties");
        try {
            configs.load(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException e) {
            }
        }
        props.put(PROTOCOL, configs.getProperty(PROTOCOL));
        props.put(HOST, configs.getProperty(HOST));
        props.put(PORT, configs.getProperty(PORT));
        props.put(VALIDATE, configs.getProperty(VALIDATE));
        props.put(DEBUG, configs.getProperty(DEBUG));
        authenticator = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(configs.getProperty(USERNAME), configs.getProperty(PASSWORD));
            }
        };
        */
        props.put(vPROTOCOL, PROTOCOL);
        props.put(vHOST, HOST);
        props.put(vPORT, PORT);
        props.put(vVALIDATE,VALIDATE);
        props.put(vDEBUG, DEBUG);
        authenticator = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(USERNAME, VPASSWORD);
            }
        };
    }

    /**
     * 创建邮件即创建 java mail 的 session 和 message实例
     */
    public void createMail() {
        session = Session.getInstance(props, authenticator);
        message = new MimeMessage(session);
        try {
            //设置邮件发送地址
            message.setFrom(new InternetAddress(FROM));
        } catch (AddressException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送邮件
     */
    abstract void sendMail();

}