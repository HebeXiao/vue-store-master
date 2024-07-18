<template>
  <div>
    <h1 class="centered-title" v-if="getCurrentChallengeId === 1">
      Preventing BOLA: Your Adventure Toolkit
    </h1>
    <h1 class="centered-title" v-if="getCurrentChallengeId === 2">
      Preventing BOPLA: Your Adventure Toolkit
    </h1>
    <div class="defences-content" v-if="getCurrentChallengeId === 1">
      <div class="title-with-image">
        <img src="@/assets/imgs/postman1.png" class="defences-image" />
        <h2>
          1. Implement an Authorization Mechanism Based on User Policies and
          Hierarchies
        </h2>
      </div>
      <p>
        In an e-commerce platform, different users have different permissions.
        For example, a normal user can only view his/her own orders, while an
        administrator can view all orders. For this, we need to define user
        roles and implement these roles in the business logic.
      </p>
      <div class="code-container">
        <p>original code</p>
        <pre><code>
<span class="keyword">@GetMapping</span>("/list")
public <span class="keyword">ResponseEntity</span> &lt;?&gt; <span class="keyword">listOrdersByUserId</span>(<span class="keyword">@RequestParam</span>("<span class="string">user_id</span>") <span class="keyword">Integer</span> userId,
                                            <span class="keyword">@RequestHeader</span>("<span class="string">Authorization</span>") <span class="keyword">String</span> token) {
    <span class="keyword">return</span> <span class="keyword">ResponseEntity</span>.<span class="keyword">ok</span>(orderService.<span class="keyword">list</span>(userId, token));
}
</code></pre>
      </div>
      <div class="code-container">
        <p>Reference code</p>
        <pre><code>
<span class="keyword">@GetMapping</span>("/list")
public <span class="keyword">ResponseEntity</span> &lt;?&gt; <span class="keyword">listOrdersByUserId</span>(<span class="keyword">@RequestParam</span>("<span class="string">user_id</span>") <span class="keyword">Integer</span> userId,
                                            <span class="keyword">@RequestHeader</span>("<span class="string">Authorization</span>") <span class="keyword">String</span> token) {
    <span class="keyword">User</span> currentUser = userService.<span class="keyword">getUserFromToken</span>(token); <span class="comment">// Parsing the token for user information</span>

    <span class="comment">// Administrators can view all users' orders, regular users can only view their own orders.</span>
    <span class="keyword">if</span> (!currentUser.getRoles().<span class="keyword">contains</span>("<span class="string">ADMIN</span>") &amp;&amp; !currentUser.getId().<span class="keyword">equals</span>(userId)) {
        <span class="keyword">return</span> ResponseEntity.<span class="keyword">status</span>(HttpStatus.FORBIDDEN).<span class="keyword">body</span>("<span class="string">Access denied due to insufficient privileges.</span>");
    }

    <span class="keyword">return</span> ResponseEntity.<span class="keyword">ok</span>(orderService.<span class="keyword">list</span>(userId, token));
}
</code></pre>
      </div>
      <p>
        Through code modifications, we implemented an authorization mechanism
        based on user roles and hierarchies to ensure that only administrators
        can view the orders of all users, while ordinary users can only view
        their own orders. This is achieved by parsing user information from the
        request header and performing permission checks, which greatly improves
        the security of the system and prevents unauthorized access.
      </p>
      <div class="title-with-image">
        <img src="@/assets/imgs/postman2.png" class="defences-image" />
        <h2>2. Use Authorization Mechanisms to Check User Permissions</h2>
      </div>
      <p>
        When processing each client request, we need to verify not only the
        user's identity but also their authorization to access specific
        resources.
      </p>
      <div class="code-container">
        <p>original code</p>
        <pre><code>
<span class="keyword">@GetMapping</span>("/list")
public <span class="keyword">ResponseEntity</span> &lt;?&gt; <span class="keyword">listOrdersByUserId</span>(<span class="keyword">@RequestParam</span>("<span class="string">user_id</span>") <span class="keyword">Integer</span> userId,
                                            <span class="keyword">@RequestHeader</span>("<span class="string">Authorization</span>") <span class="keyword">String</span> token) {
    <span class="keyword">return</span> <span class="keyword">ResponseEntity</span>.<span class="keyword">ok</span>(orderService.<span class="keyword">list</span>(userId, token));
}
</code></pre>
      </div>
      <div class="code-container">
        <p>Reference code</p>
        <pre><code>
<span class="keyword">@GetMapping</span>("<span class="string">/list</span>")
public <span class="keyword">ResponseEntity</span> &lt;?&gt; <span class="keyword">listOrdersByUserId</span>(<span class="keyword">@RequestParam</span>("<span class="string">user_id</span>") <span class="keyword">Integer</span> userId,
                                            <span class="keyword">@RequestHeader</span>("<span class="string">Authorization</span>") <span class="keyword">String</span> token) {
    <span class="keyword">User</span> currentUser = userService.<span class="keyword">getUserFromToken</span>(token); <span class="comment">// Parsing the token for user information</span>

    <span class="comment">// Check if the user has permission to view the specified orders</span>
    <span class="keyword">if</span> (!permissionService.<span class="keyword">hasPermission</span>(currentUser.getId(), "<span class="string">VIEW_ORDER</span>", userId)) {
        <span class="keyword">return</span> ResponseEntity.<span class="keyword">status</span>(HttpStatus.FORBIDDEN).<span class="keyword">body</span>("<span class="string">Access denied</span>");
    }

    <span class="keyword">return</span> ResponseEntity.<span class="keyword">ok</span>(orderService.<span class="keyword">list</span>(userId, token));
}
</code></pre>
      </div>
      <p>
        Through code modifications, we introduced a permission checking
        mechanism to verify that a user is authorized to access a specific
        resource. When processing each client request, we not only resolved the
        user's identity, but also used the `permissionService.hasPermission`
        method to check whether the user has permission to view the specified
        order. This ensures that only authorized users have access to the
        corresponding data, thus enhancing the security of the system against
        unauthorized access.
      </p>
      <div class="title-with-image">
        <img src="@/assets/imgs/postman4.png" class="defences-image" />
        <h2>3. Use Random and Unpredictable Values as Record IDs (GUIDs)</h2>
      </div>
      <p>
        To enhance security, we should use GUIDs (Globally Unique Identifiers)
        instead of simple integer IDs. GUIDs are unpredictable, making it much
        harder for attackers to guess and access other users' resources.
      </p>
      <div class="code-container">
        <p>original code</p>
        <pre><code>
<span class="keyword">@PostMapping</span>("<span class="string">save</span>")
public <span class="keyword">Object</span> <span class="keyword">save</span>(<span class="keyword">@RequestBody</span> <span class="keyword">OrderParam</span> orderParam) {
    <span class="keyword">return</span> orderService.<span class="keyword">save</span>(orderParam);
}
</code></pre>
      </div>
      <div class="code-container">
        <p>Reference code</p>
        <pre><code>
<span class="keyword">@PostMapping</span>("<span class="string">save</span>")
public <span class="keyword">Object</span> <span class="keyword">save</span>(<span class="keyword">@RequestBody</span> <span class="keyword">OrderParam</span> orderParam) {
    <span class="comment">// Generate a random GUID for the order ID</span>
    <span class="keyword">String</span> orderId = UUID.<span class="keyword">randomUUID</span>().<span class="keyword">toString</span>();
    orderParam.<span class="keyword">setId</span>(orderId); <span class="comment">// Assume OrderParam has a setId method</span>
    
    <span class="keyword">return</span> orderService.<span class="keyword">save</span>(orderParam);
}
</code></pre>
      </div>
      <p>
        With a code modification, we use GUIDs (globally unique identifiers) as
        record IDs to enhance security. When an order is saved, a random GUID is
        generated and set to the ID of the order. this makes the record ID
        unpredictable, making it much harder for an attacker to guess and access
        other users' resources, thus effectively preventing potential security
        breaches.
      </p>
    </div>
    <div v-else-if="getCurrentChallengeId === 2">
      <p>
        This fix is for Challenge 2. Here are the details about the next
        vulnerability...
      </p>
    </div>
    <div class="button-container">
      <button @click="goBack">Back to Scoreboard</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ChallengeFix",
  computed: {
    ...mapGetters(["getCurrentChallengeId"]),
  },
  methods: {
    goBack() {
      this.$store.commit("resetChallengeId");
      this.$router.push("/scoreboard");
    },
  },
};
</script>

<style scoped>
/* 添加到 <style scoped> 中 */
.code-container {
  background-color: #f4f4f4;
  border-left: 5px solid #45a049;
  margin: 20px 0;
  padding: 10px 20px;
  overflow-x: auto; /* 处理过长代码的滚动 */
  font-family: "Courier New", Courier, monospace; /* 代码字体 */
}

.code {
  color: #333;
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 90%;
}

/* 新增代码高亮样式 */
.keyword {
  color: #0077aa; /* 蓝色，用于关键字 */
}

.string {
  color: #d14; /* 红色，用于字符串 */
}

.comment {
  color: #999988; /* 浅灰色，用于注释 */
}

.number {
  color: #099; /* 暗青色，用于数字 */
}

.centered-title {
  text-align: center;
  font-size: 30px;
  color: #45a049;
}

.title-with-image {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.defences-image {
  width: 30px; /* 调整图片的宽度 */
  height: auto; /* 使图片保持比例 */
  margin-right: 10px; /* 调整图片与标题之间的间距 */
}

h2 {
  font-size: 18px;
  margin: 0; /* 确保标题与图片在同一行 */
}

.defences-content {
  padding: 0 50px;
}

.button-container {
  display: flex;
  justify-content: center; /* 将按钮居中 */
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #45a049;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #357938;
}
</style>
