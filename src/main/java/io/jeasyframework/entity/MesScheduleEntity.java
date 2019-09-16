package io.jeasyframework.entity;
import java.util.Date;
/**
 * Created by yaobaolin on 2017/8/3 0003.
 */
public class MesScheduleEntity {
    //Id
    private Long fProducescheduleid;
    //班次名称
    private String fProduceschedulename;
    //班次开始时间
    private String fDatestart;
    //班次结束时间
    private String fDateend;
    //计划Id
    private String fPlanid;
    //创建时间
    private Date fDatecreated;
    //是否有效
    private Short fIsenable;

    public Long getfProducescheduleid() {return fProducescheduleid;
    }

    public void setfProducescheduleid(Long fProducescheduleid) {
        this.fProducescheduleid = fProducescheduleid;
    }

    public String getfProduceschedulename() {
        return fProduceschedulename;
    }

    public void setfProduceschedulename(String fProduceschedulename) {
        this.fProduceschedulename = fProduceschedulename;
    }

    public String getfDatestart() {
        return fDatestart;
    }

    public void setfDatestart(String fDatestart) {
        this.fDatestart = fDatestart;
    }

    public String getfDateend() {
        return fDateend;
    }

    public void setfDateend(String fDateend) {
        this.fDateend = fDateend;
    }

    public String getfPlanid() {
        return fPlanid;
    }

    public void setfPlanid(String fPlanid) {
        this.fPlanid = fPlanid;
    }

    public Date getfDatecreated() {
        return fDatecreated;
    }

    public void setfDatecreated(Date fDatecreated) {
        this.fDatecreated = fDatecreated;
    }

    public Short getfIsenable() {
        return fIsenable;
    }

    public void setfIsenable(Short fIsenable) {
        this.fIsenable = fIsenable;
    }
}
