import redis.clients.jedis.JedisPooled;

public class ValkeyExample {

    public static void main(String[] args) {
        if (args.length != 1) {
            throw new IllegalArgumentException("Expected only one argument service URI");
        } else {
            JedisPooled jedisPooled = new JedisPooled(args[0]);
            jedisPooled.set("key", "hello world");
            System.out.println("The value of key is: " + jedisPooled.get("key"));
        }
    }
}
