package io.jeasyframework.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.OAuthBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.ApiKeyVehicle;
import springfox.documentation.swagger.web.SecurityConfiguration;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static springfox.documentation.builders.PathSelectors.ant;


@Configuration
@EnableSwagger2
public class Swagger2Config  {
    /**OAUTH2 API版本**/
    /*
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("io.jeasyframework.api"))
                .paths(PathSelectors.any())
                .build()
                .securitySchemes(newArrayList(oauth()))
                .securityContexts(newArrayList(securityContext()));
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("jeasyframework使用Swagger2构建RESTful API")
                .description("http://www.jeasyframework.io")
                .termsOfServiceUrl("http://www.jeasyframework.io")
                .contact("alpha")
                .version("2.0")
                .build();
    }


    @Bean
    SecurityContext securityContext() {
        AuthorizationScope[] scopes = new AuthorizationScope[]{new AuthorizationScope("userinfo", "用户信息")};

        SecurityReference securityReference = SecurityReference
                .builder()
                .reference("oauth2")
                .scopes(scopes)
                .build();


        return SecurityContext
                .builder()
                .securityReferences(newArrayList(securityReference))
                .forPaths(ant("/api/**"))
                .build();
    }

    @Bean
    SecurityScheme oauth() {
        return new OAuthBuilder()
                .name("oauth2")
                .grantTypes(grantTypes())
                .scopes(scopes())
                .build();
    }

    List<AuthorizationScope> scopes() {
        return newArrayList(new AuthorizationScope("userinfo", "用户信息"));
    }

    List<GrantType> grantTypes() {
        List<GrantType> grants = newArrayList(new AuthorizationCodeGrant(
                new TokenRequestEndpoint("http://dev.jyx365.top/sso/login", "swagger-ui", "Sa0rk3kgx"),
                new TokenEndpoint("http://dev.jyx365.top/oauth/access_token", "access_token")));
        return grants;
    }

    @Bean
    public SecurityConfiguration securityInfo() {
        return new SecurityConfiguration("swagger-ui", "Sa0rk3kgx", "userinfo",
                "jfk", "jfk", ApiKeyVehicle.HEADER, "", ",");
    }
    */

    /**普通API版本**/
    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("io.jeasyframework.api"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("jeasyframework使用Swagger2构建RESTful API")
                .description("http://www.jeasyframework.io")
                .termsOfServiceUrl("http://www.jeasyframework.io")
                .contact("alpha")
                .version("2.0")
                .build();
    }

}