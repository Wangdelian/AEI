package io.jeasyframework.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.util.Date;


/**
 * ${comments}
 *
 * @author daixirui
 * @email daixirui@gmail.com
 * @date 2018-01-30 15:27:28
 */
public class MqsIssueEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    //(唯一序号)
    private Long issueid;
    //(生产单位)
    private String productiondeptname;
    //(生产线)
    private String productionlinename;
    //(区域)
    private String pregion;
    //(采集点)
    private String pstation;
    //(系列)
    private String enginemodel;
    //发动机号码
    private String engineno;
    //$column.comments
    private String icc;
    //部位
    private String itempart;
    //失效模式
    private String failuremodel;
    //问题描述
    private String issuedesc;
    //维修方法
    private String repaircontent;
    //(状态)
    private String issuestatus;
    //(关闭时间)
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd hh:mm:ss")
    private Object dateclose;
    //(关闭人)
    private String closebyname;
    //关闭人ID
    private String closeby;
    //记录人
    private String createdbyname;
    //记录人ID
    private String createdbyid;
    //创建时间
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd hh:mm:ss")
    private Object datecreated;
    //最后一次修改人
    private String modifiedbyname;
    //最后一次修改人ID
    private String modifiedbyid;
    //最后一次修改时间
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd hh:mm:ss")
    private Object datemodified;
    //是否删除
    private Long isenable;
    //campaign标签
    private Long iscp;
    //icc编码
    private String icccode;
    //$column.comments
    private String issueremark;
    //$column.comments
    private String isonline;
    //问题属性
    private String issueattr;
    //换件条码
    private String partsbarcode;
    //关闭时间
    private String dateclosestring;
    //机型
    private String enginetype;
    //是否重现
    private String isreproduced;
    //是否重现
    private Long num;
    private String issuebz;

    public void setIssuebz(String issuebz) {
        this.issuebz = issuebz;
    }

    public String getIssuebz() {
        return this.issuebz;
    }

    /**
     * 设置：(唯一序号)
     */
    public void setNum(Long num) {
        this.num = num;
    }

    /**
     * 获取：(唯一序号)
     */
    public Long getNum() {
        return num;
    }

    /**
     * 设置：(唯一序号)
     */
    public void setIssueid(Long issueid) {
        this.issueid = issueid;
    }

    /**
     * 获取：(唯一序号)
     */
    public Long getIssueid() {
        return issueid;
    }

    /**
     * 设置：(生产单位)
     */
    public void setProductiondeptname(String productiondeptname) {
        this.productiondeptname = productiondeptname;
    }

    /**
     * 获取：(生产单位)
     */
    public String getProductiondeptname() {
        return productiondeptname;
    }

    /**
     * 设置：(生产线)
     */
    public void setProductionlinename(String productionlinename) {
        this.productionlinename = productionlinename;
    }

    /**
     * 获取：(生产线)
     */
    public String getProductionlinename() {
        return productionlinename;
    }

    /**
     * 设置：(区域)
     */
    public void setPregion(String pregion) {
        this.pregion = pregion;
    }

    /**
     * 获取：(区域)
     */
    public String getPregion() {
        return pregion;
    }

    /**
     * 设置：(采集点)
     */
    public void setPstation(String pstation) {
        this.pstation = pstation;
    }

    /**
     * 获取：(采集点)
     */
    public String getPstation() {
        return pstation;
    }

    /**
     * 设置：(系列)
     */
    public void setEnginemodel(String enginemodel) {
        this.enginemodel = enginemodel;
    }

    /**
     * 获取：(系列)
     */
    public String getEnginemodel() {
        return enginemodel;
    }

    /**
     * 设置：发动机号码
     */
    public void setEngineno(String engineno) {
        this.engineno = engineno;
    }

    /**
     * 获取：发动机号码
     */
    public String getEngineno() {
        return engineno;
    }

    /**
     * 设置：${column.comments}
     */
    public void setIcc(String icc) {
        this.icc = icc;
    }

    /**
     * 获取：${column.comments}
     */
    public String getIcc() {
        return icc;
    }

    /**
     * 设置：部位
     */
    public void setItempart(String itempart) {
        this.itempart = itempart;
    }

    /**
     * 获取：部位
     */
    public String getItempart() {
        return itempart;
    }

    /**
     * 设置：失效模式
     */
    public void setFailuremodel(String failuremodel) {
        this.failuremodel = failuremodel;
    }

    /**
     * 获取：失效模式
     */
    public String getFailuremodel() {
        return failuremodel;
    }

    /**
     * 设置：问题描述
     */
    public void setIssuedesc(String issuedesc) {
        this.issuedesc = issuedesc;
    }

    /**
     * 获取：问题描述
     */
    public String getIssuedesc() {
        return issuedesc;
    }

    /**
     * 设置：维修方法
     */
    public void setRepaircontent(String repaircontent) {
        this.repaircontent = repaircontent;
    }

    /**
     * 获取：维修方法
     */
    public String getRepaircontent() {
        return repaircontent;
    }

    /**
     * 设置：(状态)
     */
    public void setIssuestatus(String issuestatus) {
        this.issuestatus = issuestatus;
    }

    /**
     * 获取：(状态)
     */
    public String getIssuestatus() {
        return issuestatus;
    }

    /**
     * 设置：(关闭时间)
     */
    public void setDateclose(Object dateclose) {
        this.dateclose = dateclose;
    }

    /**
     * 获取：(关闭时间)
     */
    public Object getDateclose() {
        return dateclose;
    }

    /**
     * 设置：(关闭人)
     */
    public void setClosebyname(String closebyname) {
        this.closebyname = closebyname;
    }

    /**
     * 获取：(关闭人)
     */
    public String getClosebyname() {
        return closebyname;
    }

    /**
     * 设置：关闭人ID
     */
    public void setCloseby(String closeby) {
        this.closeby = closeby;
    }

    /**
     * 获取：关闭人ID
     */
    public String getCloseby() {
        return closeby;
    }

    /**
     * 设置：记录人
     */
    public void setCreatedbyname(String createdbyname) {
        this.createdbyname = createdbyname;
    }

    /**
     * 获取：记录人
     */
    public String getCreatedbyname() {
        return createdbyname;
    }

    /**
     * 设置：记录人ID
     */
    public void setCreatedbyid(String createdbyid) {
        this.createdbyid = createdbyid;
    }

    /**
     * 获取：记录人ID
     */
    public String getCreatedbyid() {
        return createdbyid;
    }

    /**
     * 设置：创建时间
     */
    public void setDatecreated(Object datecreated) {
        this.datecreated = datecreated;
    }

    /**
     * 获取：创建时间
     */
    public Object getDatecreated() {
        return datecreated;
    }

    /**
     * 设置：最后一次修改人
     */
    public void setModifiedbyname(String modifiedbyname) {
        this.modifiedbyname = modifiedbyname;
    }

    /**
     * 获取：最后一次修改人
     */
    public String getModifiedbyname() {
        return modifiedbyname;
    }

    /**
     * 设置：最后一次修改人ID
     */
    public void setModifiedbyid(String modifiedbyid) {
        this.modifiedbyid = modifiedbyid;
    }

    /**
     * 获取：最后一次修改人ID
     */
    public String getModifiedbyid() {
        return modifiedbyid;
    }

    /**
     * 设置：最后一次修改时间
     */
    public void setDatemodified(Object datemodified) {
        this.datemodified = datemodified;
    }

    /**
     * 获取：最后一次修改时间
     */
    public Object getDatemodified() {
        return datemodified;
    }

    /**
     * 设置：是否删除
     */
    public void setIsenable(Long isenable) {
        this.isenable = isenable;
    }

    /**
     * 获取：是否删除
     */
    public Long getIsenable() {
        return isenable;
    }

    /**
     * 设置：campaign标签
     */
    public void setIscp(Long iscp) {
        this.iscp = iscp;
    }

    /**
     * 获取：campaign标签
     */
    public Long getIscp() {
        return iscp;
    }

    /**
     * 设置：icc编码
     */
    public void setIcccode(String icccode) {
        this.icccode = icccode;
    }

    /**
     * 获取：icc编码
     */
    public String getIcccode() {
        return icccode;
    }

    /**
     * 设置：${column.comments}
     */
    public void setIssueremark(String issueremark) {
        this.issueremark = issueremark;
    }

    /**
     * 获取：${column.comments}
     */
    public String getIssueremark() {
        return issueremark;
    }

    /**
     * 设置：${column.comments}
     */
    public void setIsonline(String isonline) {
        this.isonline = isonline;
    }

    /**
     * 获取：${column.comments}
     */
    public String getIsonline() {
        return isonline;
    }

    /**
     * 设置：问题属性
     */
    public void setIssueattr(String issueattr) {
        this.issueattr = issueattr;
    }

    /**
     * 获取：问题属性
     */
    public String getIssueattr() {
        return issueattr;
    }

    /**
     * 设置：换件条码
     */
    public void setPartsbarcode(String partsbarcode) {
        this.partsbarcode = partsbarcode;
    }

    /**
     * 获取：换件条码
     */
    public String getPartsbarcode() {
        return partsbarcode;
    }

    /**
     * 设置：关闭时间
     */
    public void setDateclosestring(String dateclosestring) {
        this.dateclosestring = dateclosestring;
    }

    /**
     * 获取：关闭时间
     */
    public String getDateclosestring() {
        return dateclosestring;
    }

    /**
     * 设置：机型
     */
    public void setEnginetype(String enginetype) {
        this.enginetype = enginetype;
    }

    /**
     * 获取：机型
     */
    public String getEnginetype() {
        return enginetype;
    }

    /**
     * 设置：是否重现
     */
    public void setIsreproduced(String isreproduced) {
        this.isreproduced = isreproduced;
    }

    /**
     * 获取：是否重现
     */
    public String getIsreproduced() {
        return isreproduced;
    }
}

