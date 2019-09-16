package io.jeasyframework.utils;

import io.jeasyframework.config.SiteConfig;
import io.jeasyframework.utils.dynamicdatasource.DataSourceKey;
import io.jeasyframework.utils.dynamicdatasource.DynamicDataSourceContextHolder;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author zhoubangfu
 * @date 2018-8-1 16:04:36
 * @email zhoubangfu@cqrfid.cn
 * @description
 */

public class DynamicDataSourceUtils {
    //用不了siteConfig，使用变量
    private static String config01 = "是";

    /**
     * 多数据源保存数据方法
     *
     * @param daoClazz    数据连接层class对象，如果调用的是BaseDao的方法，则使用BaseDao.class
     * @param daoObject   spring注入的连接层实体
     * @param methodName  需要执行的方法名，全名
     * @param params      执行方法的参数（目前只测试了单个参数的方法，测试多参数需要了解invoke对...的解析）
     * @param paramsTypes 执行方法的参数类型，类型如果为数组类型使用Array[].class，例如：Long[].class
     * @return 增删改都返回操作行数
     */
    public static int doMethod(Class<?> daoClazz, Object daoObject, String methodName, Object params, Class... paramsTypes) {
        String master = DynamicDataSourceContextHolder.getDataSourceKey().toString();
        int o = 0;
        //更新时间2018年8月20日13:52:15
        //更新内容，增加index位置，判断为第二个数据源时则不执行
        //int index = 0;

        //for (DataSourceKey dataSourceKey : DataSourceKey.values()) {
        //    if (++index == 2 && "是".equals(config01))
        //        continue;
        //切换数据库
        //    DynamicDataSourceContextHolder.setDataSourceKey(dataSourceKey.name());

        //执行方法
        try {
            Method method = daoClazz.getDeclaredMethod(methodName, paramsTypes);

            //保存结果
            o += Integer.parseInt(method.invoke(daoObject, params).toString());
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        }
        //}

        //切回主数据
        //DynamicDataSourceContextHolder.setDataSourceKey(master);

        return o;
    }

}
