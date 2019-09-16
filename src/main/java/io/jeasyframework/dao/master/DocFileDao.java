package io.jeasyframework.dao.master;

import io.jeasyframework.dao.BaseDao;
import io.jeasyframework.entity.DocFile;

import java.util.List;

public interface DocFileDao extends BaseDao<DocFile> {
    int deleteByPrimaryKey(Object fileId);

    int insert(DocFile record);

    int insertSelective(DocFile record);

    DocFile selectByPrimaryKey(Object fileId);

    List<DocFile> selectByFolderId(Object fileFolderId);

    List<DocFile> selectByFileName(Object fileNameSearch);

    int updateByPrimaryKeySelective(DocFile record);

    int updateByPrimaryKey(DocFile record);
}