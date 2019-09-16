package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.DocFolder;

import java.util.List;

public interface DocFolderDao extends BaseDao<DocFolder> {
    int deleteByPrimaryKey(Object folderId);

    int insert(DocFolder record);

    int insertSelective(DocFolder record);

    DocFolder selectByPrimaryKey(Object folderId);

    List<DocFolder> selectByParentId(Object parentId);

    int updateByPrimaryKeySelective(DocFolder record);

    int updateByPrimaryKey(DocFolder record);
}