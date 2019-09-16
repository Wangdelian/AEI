package io.jeasyframework.entity;

import java.util.Date;

public class DocFile {
    private Long fileId;

    private String fileName;

    private Long fileFolderId;

    private String fileFolderName;

    private Double fileSize;

    private String fileType;

    private String filePath;

    private String fileComment;

    private Short fileVersion;

    private Date createTime;

    private Long creatorId;

    private String creatorName;

    /**
     * 修改时间
     * mend手误
     */

    private Date mdedTime;

    private Long menderId;

    private String menderName;

    private Short isenable;

    private String md5;

    private String sha1;

    private Long visitCount;

    private Long downloadCount;

    private Object standby1;

    private Object standby2;

    private Object standby3;

    private Object standby4;

    private Object standby5;

    public Long getFileId() {
        return fileId;
    }

    public void setFileId(Long fileId) {
        this.fileId = fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getFileFolderId() {
        return fileFolderId;
    }

    public void setFileFolderId(Long fileFolderId) {
        this.fileFolderId = fileFolderId;
    }

    public String getFileFolderName() {
        return fileFolderName;
    }

    public void setFileFolderName(String fileFolderName) {
        this.fileFolderName = fileFolderName;
    }

    public Double getFileSize() {
        return fileSize;
    }

    public void setFileSize(Double fileSize) {
        this.fileSize = fileSize;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getFileComment() {
        return fileComment;
    }

    public void setFileComment(String fileComment) {
        this.fileComment = fileComment;
    }

    public Short getFileVersion() {
        return fileVersion;
    }

    public void setFileVersion(Short fileVersion) {
        this.fileVersion = fileVersion;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Date getMdedTime() {
        return mdedTime;
    }

    public void setMdedTime(Date mdedTime) {
        this.mdedTime = mdedTime;
    }

    public Long getMenderId() {
        return menderId;
    }

    public void setMenderId(Long menderId) {
        this.menderId = menderId;
    }

    public String getMenderName() {
        return menderName;
    }

    public void setMenderName(String menderName) {
        this.menderName = menderName;
    }

    public Short getIsenable() {
        return isenable;
    }

    public void setIsenable(Short isenable) {
        this.isenable = isenable;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    public String getSha1() {
        return sha1;
    }

    public void setSha1(String sha1) {
        this.sha1 = sha1;
    }

    public Long getVisitCount() {
        return visitCount;
    }

    public void setVisitCount(Long visitCount) {
        this.visitCount = visitCount;
    }

    public Long getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(Long downloadCount) {
        this.downloadCount = downloadCount;
    }

    public Object getStandby1() {
        return standby1;
    }

    public void setStandby1(Object standby1) {
        this.standby1 = standby1;
    }

    public Object getStandby2() {
        return standby2;
    }

    public void setStandby2(Object standby2) {
        this.standby2 = standby2;
    }

    public Object getStandby3() {
        return standby3;
    }

    public void setStandby3(Object standby3) {
        this.standby3 = standby3;
    }

    public Object getStandby4() {
        return standby4;
    }

    public void setStandby4(Object standby4) {
        this.standby4 = standby4;
    }

    public Object getStandby5() {
        return standby5;
    }

    public void setStandby5(Object standby5) {
        this.standby5 = standby5;
    }

    @Override
    public String toString() {
        return "DocFile{" +
                "fileId=" + fileId +
                ", fileName='" + fileName + '\'' +
                ", fileFolderId=" + fileFolderId +
                ", fileFolderName='" + fileFolderName + '\'' +
                ", fileSize=" + fileSize +
                ", fileType='" + fileType + '\'' +
                ", filePath='" + filePath + '\'' +
                ", fileComment='" + fileComment + '\'' +
                ", fileVersion=" + fileVersion +
                ", createTime=" + createTime +
                ", creatorId=" + creatorId +
                ", creatorName='" + creatorName + '\'' +
                ", mdedTime=" + mdedTime +
                ", menderId=" + menderId +
                ", menderName='" + menderName + '\'' +
                ", isenable=" + isenable +
                ", md5='" + md5 + '\'' +
                ", sha1='" + sha1 + '\'' +
                ", visitCount=" + visitCount +
                ", downloadCount=" + downloadCount +
                ", standby1=" + standby1 +
                ", standby2=" + standby2 +
                ", standby3=" + standby3 +
                ", standby4=" + standby4 +
                ", standby5=" + standby5 +
                '}';
    }
}