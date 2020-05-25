#/bin/bash

JPEG=${JPEG:-70}
WEBP=${WEBP:-80}

# normal density jpg
python ./crop.py $1 $2/$3-post-1x.jpg 830 auto --jpeg-quality=$JPEG

# double density jpg
python ./crop.py $1 $2/$3-post-2x.jpg 1660 auto --jpeg-quality=$JPEG

# normal density webp
python ./crop.py $1 $2/$3-post-1x.webp 830 auto --webp-quality=$WEBP

# double density webp
python ./crop.py $1 $2/$3-post-2x.webp 1660 auto --webp-quality=$WEBP

