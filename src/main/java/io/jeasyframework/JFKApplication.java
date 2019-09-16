package io.jeasyframework;


import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("io.jeasyframework.dao")
@ComponentScan({"io.jeasyframework"})
@EnableScheduling
public class JFKApplication extends SpringBootServletInitializer{
	//public class JFKApplication{
	public static void main(String[] args) {
		SpringApplication.run(JFKApplication.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(JFKApplication.class);
	}

	/*@Bean
	public JsonpCallbackFilter filter(){
		return new JsonpCallbackFilter();
	}*/
}


/*
打包为war
@SpringBootApplication
@MapperScan("io.renren.dao")
//public class JFKApplication extends SpringBootServletInitializer{
public class JFKApplication{
	public static void main(String[] args) {
		SpringApplication.run(JFKApplication.class, args);
	}

	//@Override
	//protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	//	return application.sources(JFKApplication.class);
	//}



}
*/