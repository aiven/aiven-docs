---
title: RedisJSON v2 syntax compatibility
---

Learn how to optimize your experience with RedisJSON in Aiven for Dragonfly® with the v2 JSONPath syntax using the $ root node.

## JSONPath syntax versions

Aiven for Dragonfly services use the v2 JSONPath syntax, ensuring compatibility with
RedisJSON. This syntax designates the dollar sign (`$`) as the root node for JSON paths,
moving away from the previously used dot (`.`) notation. This modification improves JSON
command standardization for seamless integration between Aiven for Dragonfly and
RedisJSON.

For a comprehensive list of these JSON commands,
see [Dragonfly documentation](https://www.dragonflydb.io/docs/category/json).

## Ensure compatibility with RedisJSON v2

- **Confirm library support:** Ensure your application uses libraries compatible with
  RedisJSON's v2 JSONPath syntax. This might require updating to the latest versions of
  these libraries.
- **Adjust JSONPath expressions:** Update your JSONPath expressions to use the `$` root
  node. Convert dot notation paths (`.path.to.element`) to the v2
  syntax (`$.path.to.element`).
- **Testing:** Test your application after making these adjustments to
  confirm that interactions with RedisJSON operate as expected, particularly in
  areas that rely heavily on JSONPath expressions.

## Related pages

- [RedisJSON documentation](https://redis.io/docs/data-types/json/path/)
