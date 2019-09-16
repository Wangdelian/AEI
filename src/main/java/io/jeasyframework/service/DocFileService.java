package io.jeasyframework.service;

import io.jeasyframework.entity.DocFile;

import java.util.List;

/**
 * Created by Admin-zbf on 2017/8/14.
 */
public interface DocFileService {
    List<DocFile> queryByFolderId(Object fileFolderId);
    int add(DocFile docFile);
    DocFile queryById(Object fileId);
    int update(DocFile docFile);
    int delete(Object fileId);
    List<DocFile> queryByName(Object fileName);
}
