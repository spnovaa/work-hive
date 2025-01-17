CREATE TABLE Users(
	U_Id				BIGINT				IDENTITY(1, 1),
	U_Name				NVARCHAR(64)		NOT NULL,
	U_LastName			NVARCHAR(64)		NOT NULL,
	U_Email				NVARCHAR(128)		NOT NULL,
	U_Password			NVARCHAR(512)		NOT NULL,
	U_ProfileImg		NVARCHAR(64)		NULL,
	U_CreatedAt			DATETIME2			NOT NULL,
	U_UpdatedAt			DATETIME2			NOT NULL,

	CONSTRAINT			PKUsers				PRIMARY KEY(U_Id),
	CONSTRAINT			UNQUsersEmail		UNIQUE(U_Email),
	CONSTRAINT			CHKUsersEmail		CHECK(U_Email LIKE '%_@__%.__%')
)
GO

CREATE TABLE Teams(
	T_Id				BIGINT				IDENTITY,
	T_Name				NVARCHAR(128)		NOT NULL,
	T_CreatedAt			DATETIME2			NOT NULL,
	T_UpdatedAt			DATETIME2			NOT NULL,

	CONSTRAINT			PKTeams				PRIMARY KEY(T_Id),
)
GO


CREATE TABLE Projects(
	P_Id				BIGINT				IDENTITY(1,1),
	P_TeamId			BIGINT				NULL,
	P_Name				NVARCHAR(64)		NOT NULL,
	P_Img				NVARCHAR(64)		NULL,
	P_CreatedAt			DATETIME2			NOT NULL,
	P_UpdatedAt			DATETIME2			NOT NULL,

	CONSTRAINT			PKProjects			PRIMARY KEY(P_Id),
	CONSTRAINT			FKProjectTeam		FOREIGN KEY(P_TeamId)		REFERENCES Teams(T_Id)
)
GO

CREATE TABLE Tasks(
	T_Id				BIGINT				IDENTITY(1, 1),
	T_Title				NVARCHAR(64)		NOT NULL,
	T_Description		NVARCHAR(256)		NULL,
	T_Progress			INT					NOT NULL					DEFAULT(0),
	T_DueDate			DATE				NULL,
	T_Priority			INT					NOT NULL					DEFAULT(0),
	T_ProjectId			BIGINT				NOT NULL,
	T_CreatedAt			DATETIME2			NOT NULL,
	T_UpdatedAt			DATETIME2			NOT NULL,

	CONSTRAINT			PKTasks				PRIMARY KEY(T_Id),
	CONSTRAINT			CHKTasksProgress	CHECK(T_Progress BETWEEN 0 AND 100),
	CONSTRAINT			CHKTasksPriority	CHECK(T_Priority BETWEEN 0 AND 100),
	CONSTRAINT			FKTasksProject		FOREIGN KEY(T_ProjectId)	REFERENCES Projects(P_Id)
)
GO

CREATE TABLE SubTasks(
	S_Id				BIGINT				IDENTITY(1, 1),
	S_TaskId			BIGINT				NOT NULL,
	S_IsCompleted		BIT					NOT NULL					DEFAULT(0),
	S_Title				NVARCHAR(64)		NOT NULL,
	S_CreatedAt			DATETIME2			NOT NULL,
	S_UpdatedAt			DATETIME2			NOT NULL,

	CONSTRAINT			PKSubTasks			PRIMARY KEY(S_Id),
	CONSTRAINT			FKSubTasksTask		FOREIGN KEY(S_TaskId)		REFERENCES Tasks(T_Id)
)
GO

CREATE TABLE Roles(
    R_Id                BIGINT              IDENTITY(1, 1),
    R_Name              NVARCHAR(16)        NOT NULL,

    CONSTRAINT          PKRoles             PRIMARY KEY(R_Id),
)
GO

INSERT INTO Roles(R_Name) VALUES ('Administrator'), ('Normal-User')
GO

CREATE TABLE Permissions(
    P_Id                BIGINT              IDENTITY(1, 1),
    P_Slug              NVARCHAR(32)        NOT NULL,

    CONSTRAINT          PKPermissions       PRIMARY KEY(P_Id),
)
GO


CREATE TABLE TeamUsers(
    T_Id                BIGINT              IDENTITY(1, 1),
    T_UserId            BIGINT              NOT NULL,
    T_TeamId            BIGINT              NOT NULL,

    CONSTRAINT          PKTeamUsers         PRIMARY KEY(T_Id),
    CONSTRAINT          FKTeamUsersUser     FOREIGN KEY(T_UserId)           REFERENCES Users(U_Id),
    CONSTRAINT          FKTeamUsersTeam     FOREIGN KEY(T_TeamId)           REFERENCES Teams(T_Id)
)
GO

CREATE TABLE UsersTasks(
    U_Id                BIGINT              IDENTITY(1, 1),
    U_TaskId            BIGINT              NOT NULL,
    U_UserId            BIGINT              NOT NULL,

    CONSTRAINT          PKUserTasks         PRIMARY KEY(U_Id),
    CONSTRAINT          FKUserTasksUser     FOREIGN KEY(U_UserId)           REFERENCES Users(U_Id),
    CONSTRAINT          FKUserTasksTask     FOREIGN KEY(U_TaskId)           REFERENCES Tasks(T_Id)
)
GO
