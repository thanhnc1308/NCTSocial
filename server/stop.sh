docker ps | grep nct_social_server | awk '{ print $1; }' | xargs docker stop
