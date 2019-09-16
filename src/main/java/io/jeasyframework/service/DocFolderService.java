package io.jeasyframework.service;

import io.jeasyframework.entity.DocFolder;

import java.util.List;
import java.util.Map;

/**
 * Created by Admin-zbf on 2017/8/7.
 */
public interface DocFolderService {
    public List<DocFolder> queryByParentId(Object parentId);

    public DocFolder queryById(Object folderId);

    public void deleteFolder(Object folderId);

    public int addFolder(DocFolder docFolder);

    public int updateFolder(DocFolder docFolder);

    public List<DocFolder> queryAll(Map<String, Object> map);

}
