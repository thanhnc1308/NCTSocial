DEFAULT_TAG=r1

while getopts t: flag
do
    case "${flag}" in
        t) tag=${OPTARG};;
    esac
done

docker build . -t nct_social_server:${tag:-$DEFAULT_TAG}
