curl -XPUT 'http://localhost:9200/_river/octopus/_meta' -d '{ 
    "type": "mongodb", 
    "mongodb": { 
    		"servers": [
    			{
    				"host": "127.0.0.1",
    				"port": 27017
    			}
    		],
    		"options": {
    			"secondary_read_preference": true
    		},
        "db": "octopus", 
        "collection": "profiles"
    }, 
    "index": {
        "name": "profilesindex", 
        "type": "profile" 
    }
}'