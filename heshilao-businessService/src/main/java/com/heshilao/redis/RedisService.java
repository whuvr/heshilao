package com.heshilao.redis;

import javax.annotation.Resource;

import org.springframework.data.redis.core.RedisTemplate;

import com.alibaba.dubbo.config.annotation.Service;

/**
 * redis服务
 *
 * @author zhufeng
 * @since heshilao_v1.0
 */
@Service
public class RedisService implements IRedisService
{
    @Resource 
    RedisTemplate<String, Object> redisTemplate;
    
    @Override
    public Object getValue(String key)
    {
        redisTemplate.opsForValue().set(key, 1);
        Object value = redisTemplate.opsForValue().get(key);
        redisTemplate.delete(key);
        System.out.println(redisTemplate.opsForValue().get(key));
        return value;
    }
}
