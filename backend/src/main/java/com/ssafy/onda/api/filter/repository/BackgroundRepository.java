package com.ssafy.onda.api.filter.repository;

import com.ssafy.onda.api.diary.entity.Background;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BackgroundRepository extends JpaRepository <Background, Long> {
}
