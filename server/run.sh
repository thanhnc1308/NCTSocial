DEFAULT_TAG=r1

while getopts t: flag
do
    case "${flag}" in
        t) tag=${OPTARG};;
    esac
done

docker run --env-file=.env.dev --rm -p 49160:8080 nct_social_server:${tag:-$DEFAULT_TAG}
