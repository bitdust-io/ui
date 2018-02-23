#!/bin/bash


ROOT_DIR="$HOME/.bitdust"
SOURCE_DIR="${ROOT_DIR}/src"
VENV_DIR="${ROOT_DIR}/venv"
BITDUST_PY="${SOURCE_DIR}/bitdust.py"
BITDUST_COMMAND_FILE="${ROOT_DIR}/bitdust"
GLOBAL_COMMAND_FILE="/usr/local/bin/bitdust"


gitok=`which git`

if [[ ! $gitok ]]; then
    echo ''
    echo '##### Installing Git...'
    tempd=$(mktemp -d)
    curl -L "https://sourceforge.net/projects/git-osx-installer/files/git-2.15.1-intel-universal-mavericks.dmg/download" > $tempd/pkg.dmg
    listing=$(sudo hdiutil attach $tempd/pkg.dmg | grep Volumes)
    volume=$(echo "$listing" | cut -f 3)
    echo $volume
    if [ -e "$volume"/*.app ]; then
        sudo cp -rf "$volume"/*.app /Applications
    elif [ -e "$volume"/*.pkg ]; then
        package=$(ls -1 "$volume/" | grep ".pkg" | head -1)
        echo $package
        sudo installer -verbose -pkg "$volume/$package" -target /
    fi
    sudo hdiutil detach "$volume"
    rm -rf $tempd

else
    echo ''
    echo '##### Git already installed'
fi


which -s brew
if [[ $? != 0 ]]; then
    echo ''
    echo '##### Installing Homebrew...'
    echo | ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    echo ''
    echo '##### Homebrew already installed'
fi


pythonok=`brew list | grep python`
pipok=`which pip`


if [[ ! $pythonok ]]; then
    echo ''
    echo '##### Installing Formula Python...'
    brew install python
else
    echo ''
    echo '##### Python already installed'
fi


if [[ ! $pipok ]]; then
    echo ''
    echo '##### Installing PIP for current user'
    pip install --upgrade --user
    pip install --upgrade pip --user

    echo ''
    echo '##### Installing virtualenv for current user'
    pip install virtualenv --user
else
    echo ''
    echo '##### PIP already installed'
fi


if [[ ! -e $SOURCE_DIR ]]; then
    echo ''
    echo '##### Сloning the source code of BitDust project...'
    mkdir -p $SOURCE_DIR
    git clone --depth=1 https://github.com/bitdust-io/devel.git $SOURCE_DIR
    # git clone --depth=1 https://github.com/bitdust-io/public.git $SOURCE_DIR
else
    echo ''
    echo '##### BitDust source code already cloned locally'
fi


if [[ ! -e $VENV_DIR ]]; then
    echo ''
    echo '##### Building BitDust virtual environment...'
    python $BITDUST_PY install
    
    ln -s -f $BITDUST_COMMAND_FILE $GLOBAL_COMMAND_FILE
    echo ''
    echo '##### System-wide shell command for BitDust created in ${GLOBAL_COMMAND_FILE}'
else
    echo ''
    echo '##### BitDust virtual environment already exist'
fi


echo ''
echo '##### Starting BitDust as a daemon pocess'
$GLOBAL_COMMAND_FILE daemon


echo ''
echo '##### DONE!!!'

