package io.jeasyframework.utils.validator;

import io.jeasyframework.utils.DateUtils;
import io.jeasyframework.utils.RRException;
import org.apache.commons.lang.StringUtils;

/**
 * 数据校验
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-03-23 15:50
 */
public abstract class Assert {

    public static void isBlank(String str, String message) {
        if (StringUtils.isBlank(str)) {
            throw new RRException(message);
        }
    }

    public static void isNull(Object object, String message) {
        if (object == null) {
            throw new RRException(message);
        }
    }

    public static void isymd(String fTimethrough,String message){
        if(fTimethrough != null&&fTimethrough != ""){
            //String str = "^\\d{4}(\\-|\\/|\\.)\\d{1,2}\\1\\d{1,2}$";
            String str = "^[1-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$";
            Boolean result = fTimethrough.matches(str);
            if (!result) {
                throw new RRException(message);
            }
        }
    }

    public static void isoneortwo(String param,String message){
        if(param != null&&param != ""){
            if(!("1".equals(param)||"2".equals(param))){
                throw new RRException(message);
            }
        }
    }

    public static void isint(String param,String message){
        if(param != null&&param != ""){
            String str = "^[1-9]\\d*$";
            Boolean result = param.matches(str);
            if (!result) {
                throw new RRException(message);
            }
        }
    }



}
