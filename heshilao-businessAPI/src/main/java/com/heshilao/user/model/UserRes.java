package com.heshilao.user.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户返回对象
 * 
 * @author zf
 * @see [相关类/方法]（可选）
 * @since p2p_cloud_v1.0
 */
public class UserRes implements Serializable
{
    private static final long serialVersionUID = 7997572795882565773L;

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
    private String username;

    /**
     * 姓名
     */
    private String realName;

    /**
     * 实名时间
     */
    private Date realNameTime;

    /**
     * 电子邮件
     */
    private String email;

    /**
     * 手机
     */
    private String phone;

    /**
     * 证件号
     */
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
     * 实名状态：0:未认证 1：已认证 2：未通过 3 : 实名通过但未授权 4：待审核 5：实名通过但未后台登记
     */
    private Byte realNameStatus;

    /**
     * 是否开通借款 0不开通，1开通
     */
    private Boolean canBorrow;

    /**
     * 是否开通分账 0不开通，1开通
     */
    private Boolean canSplit;

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
     * 是否已充值
     */
    private Boolean isRecharged;

    /**
     * 是否已投资
     */
    private Boolean isInvested;

    /**
     * 用户头像
     */
    private String headPortraitUrl;

    /**
     * 未读信息的条数
     */
    private int isNotReadedMessage;

    /**
     * 用户类型： 0，普通用户 1，企业用户
     */
    private Byte userType;

    /**
     * 邮箱验证码
     */
    private String code;

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
     * 是否已经绑卡
     */
    private boolean isBindCard;

    /**
     * 登陆客户端
     */
    private String clientType;

    /**
     * app CLD
     */
    private String clientId;

    /**
     * mobile
     */
    private String identifier;

    /**
     * 已绑定银行卡 用,分隔
     */
    private String bankNos;
    
    /**
     * 本人是否标第一个投资人
     */
    private boolean isInvestBorrowFirst;
    

    public String getRealNameStatusTranslate()
    {
        if (realNameStatus == null)
        {
            return null;
        }
        if (realNameStatus == 0)
        {
            return "未认证";
        }
        else
        {
            return realNameStatus == 1 ? "已认证" : "未通过";
        }

    }

    public String getIsLockTranslate()
    {
        if (isLock == null)
            return null;
        return isLock ? "锁定" : "未锁定";
    }

    public Boolean getCanSplit()
    {
        return canSplit;
    }

    public void setCanSplit(Boolean canSplit)
    {
        this.canSplit = canSplit;
    }

    public String getCanBorrowTranslate()
    {
        if (canBorrow == null)
            return null;
        return canBorrow ? "开通" : "未开通借款";
    }

    public String getCode()
    {
        return code;
    }

    public void setCode(String code)
    {
        this.code = code;
    }

    public int getIsNotReadedMessage()
    {
        return isNotReadedMessage;
    }

    public void setIsNotReadedMessage(int isNotReadedMessage)
    {
        this.isNotReadedMessage = isNotReadedMessage;
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

    public String getRealName()
    {
        return realName;
    }

    public void setRealName(String realName)
    {
        this.realName = realName == null ? null : realName.trim();
    }

    public Date getRealNameTime()
    {
        return realNameTime;
    }

    public void setRealNameTime(Date realNameTime)
    {
        this.realNameTime = realNameTime;
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

    public Byte getRealNameStatus()
    {
        return realNameStatus;
    }

    public void setRealNameStatus(Byte realNameStatus)
    {
        this.realNameStatus = realNameStatus;
    }

    public Boolean getCanBorrow()
    {
        return canBorrow;
    }

    public void setCanBorrow(Boolean canBorrow)
    {
        this.canBorrow = canBorrow;
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

    private boolean needValidCode;

    public boolean isNeedValidCode()
    {
        return needValidCode;
    }

    public void setNeedValidCode(boolean needValidCode)
    {
        this.needValidCode = needValidCode;
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

    public String getRegisterClient()
    {
        return registerClient;
    }

    public void setRegisterClient(String registerClient)
    {
        this.registerClient = registerClient;
    }

    public boolean getIsBindCard()
    {
        return isBindCard;
    }

    public void setIsBindCard(boolean isBindCard)
    {
        this.isBindCard = isBindCard;
    }

    public String getClientType()
    {
        return clientType;
    }

    public void setClientType(String clientType)
    {
        this.clientType = clientType;
    }

    public String getClientId()
    {
        return clientId;
    }

    public void setClientId(String clientId)
    {
        this.clientId = clientId;
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

    public String getIdentifier()
    {
        return identifier;
    }

    public void setIdentifier(String identifier)
    {
        this.identifier = identifier;
    }

    public String getBankNos()
    {
        return bankNos;
    }

    public void setBankNos(String bankNos)
    {
        this.bankNos = bankNos;
    }

	public boolean isInvestBorrowFirst() {
		return isInvestBorrowFirst;
	}

	public void setInvestBorrowFirst(boolean isInvestBorrowFirst) {
		this.isInvestBorrowFirst = isInvestBorrowFirst;
	}
}
