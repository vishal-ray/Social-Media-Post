package com.alpha.socialmediabackend.repostiories;

import com.alpha.socialmediabackend.dto.PostInfoDTO;
import com.alpha.socialmediabackend.modules.PostInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepoPostInfo extends JpaRepository<PostInfo,Long> {

}
