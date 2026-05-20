# DB Schema

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pgcrypto;





/*
==========================================
USERS
==========================================
*/

CREATE TABLE users (

    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    login_id VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password_hash VARCHAR(255),

    provider VARCHAR(20),
    provider_user_id VARCHAR(100),

    nickname VARCHAR(50) NOT NULL,
    profile_image_url TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by VARCHAR(30) NOT NULL,

    updated_at TIMESTAMPTZ,
    updated_by VARCHAR(30),

    deleted_yn CHAR(1) NOT NULL DEFAULT 'N',
    deleted_at TIMESTAMPTZ,

    CONSTRAINT chk_users_login_id
    CHECK (
        login_id ~ '^[a-z0-9_]{4,30}$'
    ),

    CONSTRAINT chk_users_deleted_yn
    CHECK (
        deleted_yn IN ('Y','N')
    )
);


COMMENT ON TABLE users IS '사용자 정보';

COMMENT ON COLUMN users.user_id IS '사용자 PK';
COMMENT ON COLUMN users.login_id IS '로그인 ID';
COMMENT ON COLUMN users.email IS '이메일';
COMMENT ON COLUMN users.password_hash IS '암호화 비밀번호';
COMMENT ON COLUMN users.provider IS 'OAuth 제공자';
COMMENT ON COLUMN users.provider_user_id IS 'OAuth 사용자 ID';
COMMENT ON COLUMN users.nickname IS '닉네임';
COMMENT ON COLUMN users.profile_image_url IS '프로필 이미지';
COMMENT ON COLUMN users.created_at IS '생성일';
COMMENT ON COLUMN users.created_by IS '생성자';
COMMENT ON COLUMN users.updated_at IS '수정일';
COMMENT ON COLUMN users.updated_by IS '수정자';
COMMENT ON COLUMN users.deleted_yn IS '삭제 여부';
COMMENT ON COLUMN users.deleted_at IS '삭제일';


CREATE INDEX ix_users_provider
ON users(provider, provider_user_id);






/*
==========================================
ROUTES
==========================================
*/

CREATE TABLE routes (

    route_id BIGSERIAL PRIMARY KEY,

    user_id UUID NOT NULL,

    title VARCHAR(100) NOT NULL,
    description TEXT,

    activity_type VARCHAR(10) NOT NULL,

    visibility VARCHAR(10)
    NOT NULL
    DEFAULT 'PRIVATE',

    encoded_polyline TEXT NOT NULL,

    route_geojson JSONB,

    start_point GEOGRAPHY(Point,4326),

    end_point GEOGRAPHY(Point,4326),

    distance_km NUMERIC(8,3),

    duration_sec INTEGER,

    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    bookmark_count INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by VARCHAR(30) NOT NULL,

    updated_at TIMESTAMPTZ,
    updated_by VARCHAR(30),

    deleted_yn CHAR(1)
    DEFAULT 'N',

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_routes_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),

    CONSTRAINT chk_routes_activity_type
    CHECK (
a       ctivity_type='RUN'
    ),

    CONSTRAINT chk_routes_visibility
    CHECK (
        visibility IN
        ('PUBLIC','PRIVATE')
    ),

    CONSTRAINT chk_routes_deleted_yn
    CHECK (
        deleted_yn IN ('Y','N')
    )

);

ALTER TABLE routes
ADD COLUMN route_cluster_id BIGINT;

ALTER TABLE routes
ADD CONSTRAINT fk_route_cluster
FOREIGN KEY(route_cluster_id)
REFERENCES route_clusters(route_cluster_id);


COMMENT ON TABLE routes IS '운동 경로';

COMMENT ON COLUMN routes.route_id IS '경로 PK';
COMMENT ON COLUMN routes.user_id IS '작성 사용자';
COMMENT ON COLUMN routes.title IS '경로 제목';
COMMENT ON COLUMN routes.description IS '설명';
COMMENT ON COLUMN routes.activity_type IS '운동 유형';
COMMENT ON COLUMN routes.visibility IS '공개 여부';
COMMENT ON COLUMN routes.encoded_polyline IS '압축 GPS 경로';
COMMENT ON COLUMN routes.route_geojson IS 'GeoJSON 데이터';
COMMENT ON COLUMN routes.start_point IS '시작 위치';
COMMENT ON COLUMN routes.end_point IS '종료 위치';
COMMENT ON COLUMN routes.distance_km IS '거리(KM)';
COMMENT ON COLUMN routes.duration_sec IS '시간(초)';
COMMENT ON COLUMN routes.like_count IS '좋아요 수';
COMMENT ON COLUMN routes.comment_count IS '댓글 수';
COMMENT ON COLUMN routes.bookmark_count IS '북마크 수';



CREATE INDEX ix_routes_user
ON routes(user_id);

CREATE INDEX ix_routes_visibility
ON routes(visibility);

CREATE INDEX ix_routes_activity_type
ON routes(activity_type);

CREATE INDEX ix_routes_created_at
ON routes(created_at DESC);

CREATE INDEX ix_routes_start
ON routes
USING GIST(start_point);

CREATE INDEX ix_routes_end
ON routes
USING GIST(end_point);


/*
==========================================
ROUTE_CLUSTERS
==========================================
*/

CREATE TABLE route_clusters (

    route_cluster_id BIGSERIAL PRIMARY KEY,

    representative_route_id BIGINT,

    activity_type VARCHAR(10)
    NOT NULL,

    route_geojson JSONB,

    center_point GEOGRAPHY(Point,4326),

    route_count INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ
    NOT NULL
    DEFAULT now(),

    created_by VARCHAR(30)
    NOT NULL,

    updated_at TIMESTAMPTZ,

    updated_by VARCHAR(30),

    deleted_yn CHAR(1)
    DEFAULT 'N',

    deleted_at TIMESTAMPTZ,

    CONSTRAINT chk_cluster_type
    CHECK(
        activity_type IN ('RUN')
    )

);


COMMENT ON TABLE route_clusters IS '유사 경로 그룹';



/*
==========================================
ACTIVITIES
==========================================
*/

CREATE TABLE activities (

    activity_id BIGSERIAL PRIMARY KEY,

    user_id UUID NOT NULL,
    route_id BIGINT,

    activity_type VARCHAR(10)
    NOT NULL,

    started_at TIMESTAMPTZ
    NOT NULL,

    ended_at TIMESTAMPTZ,

    distance_km NUMERIC(8,3),

    duration_sec INTEGER,

    status VARCHAR(20)
    DEFAULT 'STARTED',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by VARCHAR(30) NOT NULL,

    updated_at TIMESTAMPTZ,
    updated_by VARCHAR(30),

    deleted_yn CHAR(1)
    DEFAULT 'N',

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_activities_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),

    CONSTRAINT fk_activities_route
    FOREIGN KEY(route_id)
    REFERENCES routes(route_id),

    CONSTRAINT chk_activities_type
    CHECK (
        activity_type='RUN'
    ),

    CONSTRAINT chk_activities_status
    CHECK (
        status IN
        ('STARTED','FINISHED','CANCELED')
    )

);



COMMENT ON TABLE activities IS '운동 기록';

COMMENT ON COLUMN activities.activity_id IS '활동 PK';
COMMENT ON COLUMN activities.user_id IS '사용자';
COMMENT ON COLUMN activities.route_id IS '경로';
COMMENT ON COLUMN activities.started_at IS '시작 시간';
COMMENT ON COLUMN activities.ended_at IS '종료 시간';
COMMENT ON COLUMN activities.distance_km IS '이동 거리';
COMMENT ON COLUMN activities.duration_sec IS '시간';
COMMENT ON COLUMN activities.status IS '상태';



CREATE INDEX ix_activities_user
ON activities(user_id);

CREATE INDEX ix_activities_route
ON activities(route_id);






/*
==========================================
ROUTE_LIKES
==========================================
*/

CREATE TABLE route_likes (

    like_id BIGSERIAL PRIMARY KEY,

    route_id BIGINT NOT NULL,
    user_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by VARCHAR(30) NOT NULL,

    updated_at TIMESTAMPTZ,
    updated_by VARCHAR(30),

    deleted_yn CHAR(1)
    DEFAULT 'N',

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_route_likes_route
    FOREIGN KEY(route_id)
    REFERENCES routes(route_id),

    CONSTRAINT fk_route_likes_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),

    CONSTRAINT ux_route_likes
    UNIQUE(route_id,user_id)

);



COMMENT ON TABLE route_likes IS '좋아요';






/*
==========================================
ROUTE_COMMENTS
==========================================
*/

CREATE TABLE route_comments (

    comment_id BIGSERIAL PRIMARY KEY,

    route_id BIGINT NOT NULL,
    user_id UUID NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by VARCHAR(30) NOT NULL,

    updated_at TIMESTAMPTZ,
    updated_by VARCHAR(30),

    deleted_yn CHAR(1)
    DEFAULT 'N',

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_route_comments_route
    FOREIGN KEY(route_id)
    REFERENCES routes(route_id),

    CONSTRAINT fk_route_comments_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id)

);



COMMENT ON TABLE route_comments IS '댓글';






/*
==========================================
ROUTE_BOOKMARKS
==========================================
*/

CREATE TABLE route_bookmarks (

    bookmark_id BIGSERIAL PRIMARY KEY,

    route_id BIGINT NOT NULL,
    user_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by VARCHAR(30) NOT NULL,

    updated_at TIMESTAMPTZ,
    updated_by VARCHAR(30),

    deleted_yn CHAR(1)
    DEFAULT 'N',

    deleted_at TIMESTAMPTZ,

    CONSTRAINT fk_route_bookmark_route
    FOREIGN KEY(route_id)
    REFERENCES routes(route_id),

    CONSTRAINT fk_route_bookmark_user
    FOREIGN KEY(user_id)
    REFERENCES users(user_id),

    CONSTRAINT ux_route_bookmark
    UNIQUE(route_id,user_id)

);



COMMENT ON TABLE route_bookmarks IS '북마크';
```