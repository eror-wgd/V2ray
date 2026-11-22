{
  "dns": {
    "servers": [
      "103.102.228.113",
      "103.249.132.107"
    ],
    "tag": "dns-module"
  },
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": 10808,
      "protocol": "socks",
      "settings": {
        "auth": "noauth",
        "udp": true,
        "userLevel": 8
      },
      "sniffing": {
        "destOverride": [
          "http",
          "tls",
          "quic"
        ],
        "enabled": true,
        "routeOnly": false
      },
      "tag": "socks"
    }
  ],
  "log": {
    "loglevel": "warning"
  },
  "outbounds": [
    {
      "mux": {
        "concurrency": -1,
        "enabled": false
      },
      "protocol": "vless",
      "settings": {
        "address": "2.99woo.workers.dev",
        "encryption": "none",
        "id": "7be28993-b4a1-4b98-81e9-3f2700000000",
        "level": 8,
        "port": 443
      },
      "streamSettings": {
        "network": "ws",
        "security": "tls",
        "tlsSettings": {
          "allowInsecure": false,
          "fingerprint": "chrome",
          "serverName": "2.99woo.workers.dev"
        },
        "wsSettings": {
          "host": "2.99woo.workers.dev",
          "path": "/sync"
        }
      },
      "tag": "proxy"
    },
    {
      "protocol": "freedom",
      "streamSettings": {
        "network": "tcp",
        "sockopt": {
          "domainStrategy": "UseIP"
        }
      },
      "tag": "direct"
    },
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "block"
    }
  ],
  "policy": {
    "levels": {
      "8": {
        "connIdle": 300,
        "downlinkOnly": 1,
        "handshake": 4,
        "uplinkOnly": 1
      }
    },
    "system": {
      "statsOutboundUplink": true,
      "statsOutboundDownlink": true
    }
  },
  "remarks": "PUBG | DNS TEST",
  "routing": {
    "domainStrategy": "AsIs",
    "rules": [
      {
        "network": "udp",
        "outboundTag": "direct",
        "type": "field"
      },
      {
        "domain": [
          "geosite:google"
        ],
        "outboundTag": "proxy",
        "type": "field"
      },
      {
        "ip": [
          "ext:geoip-only-cn-private.dat:private"
        ],
        "outboundTag": "direct",
        "type": "field"
      },
      {
        "domain": [
          "geosite:private"
        ],
        "outboundTag": "direct",
        "type": "field"
      },
      {
        "ip": [
          "ext:geoip-only-cn-private.dat:cn"
        ],
        "outboundTag": "direct",
        "type": "field"
      },
      {
        "domain": [
          "geosite:cn"
        ],
        "outboundTag": "direct",
        "type": "field"
      }
    ]
  },
  "stats": {}
}
