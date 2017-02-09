package com.heshilao.user.model;

import java.io.Serializable;
import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import com.heshilao.user.validation.CorpRegisterValidation;
import com.heshilao.user.validation.EmailAuthenticateVadiation;
import com.heshilao.user.validation.PaymentAccountValidation;
import com.heshilao.user.validation.PhoneAuthenticateVadiation;
import com.heshilao.user.validation.RegisterValidation;

/**
 * 用户请求对象
 * 
 * @author zhufeng
 * @since heshilao_v1.0
 */
public class UserReq implements Serializable
{
    private static final long serialVersionUID = 2585082349569737219L;

    public static final byte TYPE_MAIL = 1;

    public static final int CHECK_TIME = 30 * 60 * 1000;

    /**
     * 个人用户
     */
    public static final byte USER_TYPE_PERSON = 0;

    /**
     * 企业用户
     */
    public static final byte USER_TYPE_CORP = 1;

    /**
     * 担保用户
     */
    public static final byte USER_TYPE_GUARANTOR = 2;

    /**
     * 证件类型:身份证
     */
    public static final String IDENTITY_TYPE = "IDENTITY_CARD";

    /**
     * 实名认证状态:通过
     */
    public static final byte REALNAME_STATUS_PASS = 1;

    /**
     * 实名认证状态:未通过
     */
    public static final byte REALNAME_STATUS_NOT_PASS = 2;

    /**
     * 实名认证状态:实名通过但未授权
     */
    public static final byte REALNAME_STATUS_NOT_AUTHOPTION = 3;

    /**
     * 实名认证状态:待审核
     */
    public static final byte REALNAME_STATUS_WAIT_VERIFY = 4;

    /**
     * 实名认证状态:实名通过,后台未登记
     */
    public static final byte REALNAME_STATUS_NOT_SIGN = 5;
    
    private Long id;

    /**
     * 企业id
     */
    private Integer corpId;

    /**
     * 企业名称
     */
    private String corpName;

    /**
     * 用户名
     */
    @NotNull(message = "用户名不能为空")
    /*@Pattern(regexp = "^(?![0-9]+$)[0-9A-Za-z\u0391-\uFFE5]{4,16}$", message = "用户名格式不正确", groups = {
            RegisterValidation.class, CorpRegisterValidation.class })*/
    @Pattern(regexp = "^[0-9A-Za-z\u0391-\uFFE5]{4,16}$", message = "用户名格式不正确", groups = {
    RegisterValidation.class, CorpRegisterValidation.class })
    private String username;

    /**
     * 密码
     */
    @NotNull(message = "密码不能为空")
    private String password;

    /**
     * 姓名
     */
    @NotNull(message = "姓名不能为空", groups = PaymentAccountValidation.class)
    private String realName;

    /**
     * 实名时间
     */
    private Date realNameTime;

    /**
     * 电子邮件
     */
    @NotNull(message = "邮箱不能为空", groups = EmailAuthenticateVadiation.class)
    @Pattern(regexp = "\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", message = "邮箱格式不正确", groups = { CorpRegisterValidation.class })
    private String email;

    /**
     * 手机
     */
    @NotNull(message = "手机号不能为空", groups = { CorpRegisterValidation.class, PhoneAuthenticateVadiation.class,
            RegisterValidation.class })
    private String phone;

    /**
     * 证件号
     */
    @NotNull(message = "证件号不能为空", groups = { PaymentAccountValidation.class, CorpRegisterValidation.class })
    private String idNo;

    /**
     * 性别：男，女
     */
    private String gender;

    /**
     * 注册时间
     */
    private Date registerTime;
    
    /**
     * 注册ip
     */
    private String registerIP;

    /**
     * 是否开通分账 0不开通，1开通
     */
    private Boolean canSplit;

    /**
     * 实名状态：0:未认证 1：已认证 2：未通过 3 : 实名通过但未授权 4：待第三方审核 5：实名审核通过但未后台登记
     */
    private Byte realNameStatus;

    /**
     * 是否开通借款 0不开通，1开通
     */
    private Boolean canBorrow;

    /**
     * 邮箱认证 0:未认证 1：已认证
     */
    private Boolean emailStatus;

    /**
     * 是否锁定：0：不锁定 1：锁定
     */
    private Boolean isLock;

    /**
     * 锁定时间
     */
    private Date lockTime;

    /**
     * 锁定备注
     */
    private String lockRemark;

    /**
     * 第三方客户号
     */
    private String tppCustId;

    /**
     * 第三方用户名
     */
    private String tppUsername;

    /**
     * 用户头像
     */
    private String headPortraitUrl;

    /**
     * 用户是否同意注册协议
     */
    @NotNull(message = "必须同意注册协议", groups = { PhoneAuthenticateVadiation.class, RegisterValidation.class })
    private Boolean isAgree;

    /**
     * 用户邀请码
     */
    private String userInviteCode;

    /**
     * 验证码
     */
    private String validCode;

    /**
     * 验证码
     */
    // @NotNull(message = "图片验证码不能为空", groups = RegisterValidation.class)
    private String imageCode;

    /**
     * 新密码
     */
    private String newPassword;

    /**
     * 是否已充值
     */
    private Boolean isRecharged;

    /**
     * 是否已投资
     */
    private Boolean isInvested;

    /**
     * 预还时间
     */
    private String expectedDate;

    /**
     * 用户类型： 0，普通用户 1，企业用户
     */
    private Byte userType;

    /**
     * 注册客户端，PC/WAP/IOS/ANDROID
     */
    private String registerClient;
    
    /**
     * 是否开通自动投标 0不开通，1开通
     */
    private Boolean autoTender;
    
    /**
     * 自动投票开通时间
     */
    private Date autoTenderTime;

    /**
     * 请求来源
     */
    private String urlSource;

    private String sessionId;

    /**
     * 登陆客户端
     */
    private String clientType;

    /**
     * app CID
     */
    private String clientId;
    
    /**
     * 邀请人ID
     */
    private Long inviteUserId;
    /**
     * 邀请人username
     */
    private String inviteUsername;
    /**
     * 第三方渠道
     */
    private String sourceCode;
    /**
     * 应用市场及第三方不对接渠道
     */
    private String appCode;
    /**
     * mobile 标识
     */
    private String identifier;

    private String leid;

    private String luid;

    public UserReq(Long userId, Integer corpId)
    {
        this.id = userId;
        this.corpId = corpId;
    }

    public UserReq()
    {

    }

    public String getRegisterClient()
    {
        return registerClient;
    }

    public void setRegisterClient(String registerClient)
    {
        this.registerClient = registerClient;
    }

    public String getExpectedDate()
    {
        return expectedDate;
    }

    public void setExpectedDate(String expectedDate)
    {
        this.expectedDate = expectedDate;
    }

    public Boolean getIsRecharged()
    {
        return isRecharged;
    }

    public void setIsRecharged(Boolean isRecharged)
    {
        this.isRecharged = isRecharged;
    }

    public Boolean getIsInvested()
    {
        return isInvested;
    }

    public void setIsInvested(Boolean isInvested)
    {
        this.isInvested = isInvested;
    }

    public String getNewPassword()
    {
        return newPassword;
    }

    public void setNewPassword(String newPassword)
    {
        this.newPassword = newPassword == null ? "" : newPassword;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public Integer getCorpId()
    {
        return corpId;
    }

    public void setCorpId(Integer corpId)
    {
        this.corpId = corpId;
    }

    public String getCorpName()
    {
        return corpName;
    }

    public void setCorpName(String corpName)
    {
        this.corpName = corpName == null ? null : corpName.trim();
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword()
    {
        return this.password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }

    public String getRealName()
    {
        return realName;
    }

    public Date getRealNameTime()
    {
        return realNameTime;
    }

    public void setRealNameTime(Date realNameTime)
    {
        this.realNameTime = realNameTime;
    }

    public void setRealName(String realName)
    {
        this.realName = realName == null ? null : realName.trim();
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email == null ? null : email.trim();
    }

    public String getPhone()
    {
        return phone;
    }

    public void setPhone(String phone)
    {
        this.phone = phone == null ? null : phone.trim();
    }

    public Boolean getCanBorrow()
    {
        return canBorrow;
    }

    public void setCanBorrow(Boolean canBorrow)
    {
        this.canBorrow = canBorrow;
    }

    public String getIdNo()
    {
        return idNo;
    }

    public void setIdNo(String idNo)
    {
        this.idNo = idNo == null ? null : idNo.trim();
    }

    public String getGender()
    {
        return gender;
    }

    public void setGender(String gender)
    {
        this.gender = gender == null ? null : gender.trim();
    }

    public Date getRegisterTime()
    {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime)
    {
        this.registerTime = registerTime;
    }
    
    public String getRegisterIP()
    {
        return registerIP;
    }

    public void setRegisterIP(String registerIP)
    {
        this.registerIP = registerIP;
    }

    public Boolean getCanSplit()
    {
        return canSplit;
    }

    public void setCanSplit(Boolean canSplit)
    {
        this.canSplit = canSplit;
    }

    public Byte getRealNameStatus()
    {
        return realNameStatus;
    }

    public void setRealNameStatus(Byte realNameStatus)
    {
        this.realNameStatus = realNameStatus;
    }

    public Boolean getEmailStatus()
    {
        return emailStatus;
    }

    public void setEmailStatus(Boolean emailStatus)
    {
        this.emailStatus = emailStatus;
    }

    public Boolean getIsLock()
    {
        return isLock;
    }

    public void setIsLock(Boolean isLock)
    {
        this.isLock = isLock;
    }

    public Date getLockTime()
    {
        return lockTime;
    }

    public void setLockTime(Date lockTime)
    {
        this.lockTime = lockTime;
    }

    public String getLockRemark()
    {
        return lockRemark;
    }

    public void setLockRemark(String lockRemark)
    {
        this.lockRemark = lockRemark == null ? null : lockRemark.trim();
    }

    public String getTppCustId()
    {
        return tppCustId;
    }

    public void setTppCustId(String tppCustId)
    {
        this.tppCustId = tppCustId == null ? null : tppCustId.trim();
    }

    public String getTppUsername()
    {
        return tppUsername;
    }

    public void setTppUsername(String tppUsername)
    {
        this.tppUsername = tppUsername == null ? null : tppUsername.trim();
    }

    public Boolean getIsAgree()
    {
        return isAgree;
    }

    public void setIsAgree(Boolean isAgree)
    {
        this.isAgree = isAgree;
    }

    public String getUserInviteCode()
    {
        return userInviteCode;
    }

    public void setUserInviteCode(String userInviteCode)
    {
        this.userInviteCode = userInviteCode;
    }

    public String getValidCode()
    {
        return validCode;
    }

    public void setValidCode(String validCode)
    {
        this.validCode = validCode;
    }

    public String getImageCode()
    {
        return imageCode;
    }

    public void setImageCode(String imageCode)
    {
        this.imageCode = imageCode;
    }

    public String getHeadPortraitUrl()
    {
        return headPortraitUrl;
    }

    public void setHeadPortraitUrl(String headPortraitUrl)
    {
        this.headPortraitUrl = headPortraitUrl;
    }

    public Byte getUserType()
    {
        return userType;
    }

    public void setUserType(Byte userType)
    {
        this.userType = userType;
    }

    public String getUrlSource()
    {
        return urlSource;
    }

    public void setUrlSource(String urlSource)
    {
        this.urlSource = urlSource;
    }

    public String getSessionId()
    {
        return sessionId;
    }

    public void setSessionId(String sessionId)
    {
        this.sessionId = sessionId;
    }

    public String getClientType()
    {
        return clientType;
    }

    public void setClientType(String clientType)
    {
        this.clientType = clientType;
    }
    
    public Boolean getAutoTender()
    {
        return autoTender;
    }

    public void setAutoTender(Boolean autoTender)
    {
        this.autoTender = autoTender;
    }
    
    public Date getAutoTenderTime()
    {
        return autoTenderTime;
    }

    public void setAutoTenderTime(Date autoTenderTime)
    {
        this.autoTenderTime = autoTenderTime;
    }

    public String getClientId()
    {
        return clientId;
    }

    public void setClientId(String clientId)
    {
        this.clientId = clientId;
    }
    
    public Long getInviteUserId()
    {
        return inviteUserId;
    }

    public void setInviteUserId(Long inviteUserId)
    {
        this.inviteUserId = inviteUserId;
    }

    public String getInviteUsername()
    {
        return inviteUsername;
    }

    public void setInviteUsername(String inviteUsername)
    {
        this.inviteUsername = inviteUsername;
    }

    public String getSourceCode()
    {
        return sourceCode;
    }

    public void setSourceCode(String sourceCode)
    {
        this.sourceCode = sourceCode;
    }

    public String getAppCode()
    {
        return appCode;
    }

    public void setAppCode(String appCode)
    {
        this.appCode = appCode;
    }

    public String getIdentifier()
    {
        return identifier;
    }

    public void setIdentifier(String identifier)
    {
        this.identifier = identifier;
    }

    public String getLeid()
    {
        return leid;
    }

    public void setLeid(String leid)
    {
        this.leid = leid;
    }

    public String getLuid()
    {
        return luid;
    }

    public void setLuid(String luid)
    {
        this.luid = luid;
    }

    /**
     * 实名认证状态
     *
     * @author fan
     * @see [相关类/方法]（可选）
     * @since p2p_cloud_v1.0
     */
    public interface IRealNameStatus
    {
        int UN_CERTIFICATION = 0;

        int CERTIFICATIONED = 1;

        int FAIL_CERTIFICATION = 2;

    }
}
