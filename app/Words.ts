const WORDS = [
  "hello", "world", "react", "typescript", "tailwind", "keyboard",
  "monkey", "typing", "clone", "speed", "test", "code", "developer",
  "project", "random", "challenge", "input", "function", "compare",
  "text", "timer", "start", "game", "logic", "syntax", "loop", "event",
  "state", "render", "node", "array", "object", "string", "number",
  "boolean", "null", "undefined", "variable", "constant", "parameter",
  "argument", "return", "callback", "promise", "async", "await", "fetch",
  "json", "http", "api", "server", "client", "database", "query",
  "index", "key", "value", "map", "filter", "reduce", "sort", "push",
  "pop", "shift", "unshift", "slice", "splice", "concat", "join", "split",
  "class", "extends", "constructor", "method", "property", "this",
  "super", "import", "export", "default", "module", "package", "npm",
  "yarn", "webpack", "babel", "eslint", "prettier", "git", "commit",
  "branch", "merge", "pull", "push", "clone", "fork", "issue", "pullrequest",
  "debug", "log", "error", "warning", "exception", "try", "catch",
  "finally", "throw", "type", "interface", "enum", "generic", "extends",
  "implements", "typescript", "jsx", "tsx", "nodejs", "express",
  "mongodb", "mysql", "postgresql", "redis", "graphql", "rest", "endpoint",
  "middleware", "router", "component", "props", "state", "hook", "effect",
  "context", "reducer", "dispatch", "action", "store", "redux", "mobx",
  "flux", "observable", "subscription", "eventloop", "callbackqueue",
  "microtask", "macrotask", "stack", "heap", "memory", "garbage",
  "collector", "performance", "optimization", "responsive", "design",
  "mobile", "desktop", "browser", "chrome", "firefox", "safari", "edge",
  "internet", "protocol", "url", "http", "https", "cookie", "session",
  "localstorage", "sessionstorage", "cache", "cdn", "security", "auth",
  "authorization", "token", "jwt", "oauth", "cors", "csrf", "xss",
  "sqlinjection", "encryption", "hash", "salt", "password", "user",
  "login", "logout", "register", "profile", "dashboard", "admin",
  "role", "permission", "access", "control", "api", "endpoint",
  "request", "response", "status", "code", "header", "body", "json",
  "xml", "yaml", "form", "input", "textarea", "button", "submit",
  "reset", "label", "checkbox", "radio", "select", "option", "file",
  "upload", "download", "progress", "bar", "spinner", "loader", "animation",
  "transition", "transform", "scale", "rotate", "translate", "opacity",
  "color", "background", "border", "shadow", "font", "size", "weight",
  "family", "lineheight", "letterspacing", "textalign", "uppercase",
  "lowercase", "capitalize", "bold", "italic", "underline", "strike",
  "list", "unordered", "ordered", "table", "row", "column", "cell",
  "header", "footer", "section", "article", "aside", "nav", "main",
  "header", "footer", "div", "span", "p", "h1", "h2", "h3", "h4", "h5",
  "h6", "img", "svg", "canvas", "video", "audio", "source", "track",
  "embed", "object", "param", "iframe", "script", "style", "link", "meta",
  "charset", "viewport", "description", "keyword", "author", "title",
  "head", "body", "html", "doctype", "document", "window", "navigator",
  "location", "history", "screen", "event", "target", "currenttarget",
  "preventdefault", "stoppropagation", "addEventListener", "removeEventListener",
  "setTimeout", "clearTimeout", "setInterval", "clearInterval", "promise",
  "resolve", "reject", "then", "catch", "finally", "async", "await",
  "generator", "iterator", "yield", "forof", "foreach", "map", "filter",
  "reduce", "find", "some", "every", "includes", "indexof", "lastindexof",
  "push", "pop", "shift", "unshift", "splice", "slice", "concat", "join",
  "toString", "valueof", "parseint", "parsefloat", "isnan", "isfinite",
  "math", "random", "floor", "ceil", "round", "max", "min", "pow", "sqrt",
  "abs", "log", "exp", "sin", "cos", "tan", "asin", "acos", "atan",
  "performance", "console", "debugger", "breakpoint", "watch", "profile",
  "memory", "heap", "stack", "closure", "scope", "context", "this",
  "bind", "call", "apply", "prototype", "inheritance", "encapsulation",
  "polymorphism", "abstraction", "oop", "functional", "declaration",
  "expression", "statement", "syntax", "semantics", "lexical", "grammar",
  "interpreter", "compiler", "runtime", "environment", "eventloop",
  "callstack", "microtaskqueue", "macrotaskqueue", "webapi", "dom",
  "bom", "css", "sass", "less", "postcss", "tailwind", "bootstrap",
  "materialui", "chakra", "emotion", "styledcomponents", "responsive",
  "mobilefirst", "grid", "flexbox", "position", "absolute", "relative",
  "fixed", "sticky", "zindex", "overflow", "visibility", "display",
  "block", "inline", "inlineblock", "none", "hidden", "visible", "opacity",
  "transform", "transition", "animation", "keyframes", "delay", "duration",
  "ease", "linear", "cubicbezier", "steps", "infinite", "iterationcount",
  "direction", "fillmode", "playstate", "backfacevisibility", "perspective",
  "transformstyle", "translate", "scale", "rotate", "skew", "origin",
  "shadow", "textshadow", "boxshadow", "border", "radius", "width",
  "height", "maxwidth", "minwidth", "maxheight", "minheight", "margin",
  "padding", "borderwidth", "borderstyle", "bordercolor", "backgroundcolor",
  "backgroundimage", "gradient", "lineargradient", "radialgradient",
  "conicgradient", "repeat", "no-repeat", "contain", "cover", "position",
  "top", "right", "bottom", "left", "float", "clear", "verticalalign",
  "cursor", "pointer", "default", "text", "wait", "crosshair", "move",
  "help", "progress", "notallowed", "zoomin", "zoomout", "grab", "grabbing",
  "resize", "scroll", "hidden", "auto", "scrollbar", "webkit", "moz",
  "ms", "ie", "edge",

  // More general words for variety
  "apple", "banana", "orange", "grape", "pineapple", "strawberry",
  "watermelon", "kiwi", "mango", "blueberry", "blackberry", "cherry",
  "lemon", "lime", "peach", "pear", "plum", "raspberry", "apricot",
  "coconut", "date", "fig", "guava", "papaya", "pomegranate", "tomato",
  "carrot", "potato", "onion", "garlic", "pepper", "broccoli",
  "cabbage", "celery", "corn", "cucumber", "eggplant", "lettuce",
  "mushroom", "pea", "pumpkin", "radish", "spinach", "squash", "turnip",
  "zucchini", "bread", "butter", "cheese", "cream", "egg", "flour",
  "honey", "jam", "milk", "oil", "salt", "sugar", "tea", "coffee",
  "water", "wine", "beer", "juice", "cake", "cookie", "pie", "pasta",
  "rice", "soup", "steak", "fish", "chicken", "beef", "pork", "shrimp",
  "lobster", "crab", "sauce", "salad", "sandwich", "pizza", "burger",
  "fries", "salsa", "sushi", "taco", "waffle", "yogurt", "zebra", "lion",
  "tiger", "elephant", "giraffe", "monkey", "horse", "cow", "pig",
  "sheep", "goat", "dog", "cat", "rabbit", "bear", "fox", "wolf",
  "mouse", "rat", "deer", "camel", "donkey", "duck", "eagle", "falcon",
  "owl", "parrot", "penguin", "swan", "turkey", "whale", "shark",
  "dolphin", "octopus", "crab", "lobster", "frog", "snake", "lizard",
  "crocodile", "ant", "bee", "butterfly", "dragonfly", "fly", "mosquito",
  "spider", "worm", "bat", "beetle", "catfish", "clam", "coral",
  "cricket", "crow", "dragon", "eagle", "ferret", "gecko", "goose",
  "heron", "hippo", "hornet", "jaguar", "kiwi", "lemur", "mole", "moth",
  "newt", "ocelot", "owl", "parakeet", "pelican", "platypus", "porcupine",
  "pufferfish", "raccoon", "robin", "seal", "slug", "snail", "squid",
  "tapir", "vulture", "walrus", "weasel", "yak", "zebra",

  // Common adjectives, verbs, nouns for more typing variety
  "quick", "slow", "fast", "bright", "dark", "cold", "hot", "wet",
  "dry", "happy", "sad", "angry", "calm", "loud", "quiet", "strong",
  "weak", "clean", "dirty", "fresh", "stale", "new", "old", "young",
  "big", "small", "large", "tiny", "short", "long", "wide", "narrow",
  "deep", "shallow", "soft", "hard", "heavy", "light", "thick", "thin",
  "easy", "difficult", "simple", "complex", "early", "late", "near",
  "far", "high", "low", "right", "left", "first", "last", "next", "previous",
  "open", "close", "start", "stop", "run", "walk", "jump", "sit",
  "stand", "sleep", "eat", "drink", "read", "write", "listen", "speak",
  "think", "know", "understand", "learn", "teach", "help", "play",
  "work", "drive", "fly", "swim", "buy", "sell", "give", "take",
  "build", "break", "cut", "clean", "fix", "wash", "wait", "move",
  "watch", "call", "meet", "love", "hate", "like", "dislike", "need",
  "want", "feel", "believe", "hope", "wish", "dream", "laugh", "cry",
  "smile", "frown", "dance", "sing", "cook", "cook", "bake", "draw",
  "paint", "travel", "visit", "arrive", "leave", "hide", "seek", "find",
  "lose", "win", "fail", "pass", "change", "grow", "fall", "rise",
  "begin", "end", "create", "destroy", "open", "close", "turn", "break",
  "fix", "break", "talk", "listen", "hear", "see", "watch", "touch",
  "smell", "taste", "feel",

  // A few random nouns for variety
  "apple", "book", "car", "dog", "elephant", "flower", "garden",
  "house", "island", "jungle", "king", "lake", "mountain", "night",
  "ocean", "park", "queen", "river", "sun", "tree", "umbrella",
  "village", "window", "xylophone", "yacht", "zebra", "airplane",
  "balloon", "camera", "desk", "engine", "forest", "glove", "hotel",
  "ice", "jacket", "key", "lamp", "mirror", "nest", "office", "pencil",
  "quilt", "road", "star", "train", "violin", "wheel", "xray", "yard",
  "zoo"
];

export default WORDS;
