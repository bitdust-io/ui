#!/bin/bash


pythonok=`brew list | grep python`
gitok=`brew list | grep git`
pipok=`which pip`

ROOT_DIR="$HOME/.bitdust"
SOURCE_DIR="${ROOT_DIR}/src"
VENV_DIR="${ROOT_DIR}/venv"
BITDUST_PY="${SOURCE_DIR}/bitdust.py"
BITDUST_COMMAND_FILE="${ROOT_DIR}/bitdust"
GLOBAL_COMMAND_FILE="/usr/local/bin/bitdust"


if [[ ! $pythonok ]]; then
    echo ''
    echo '##### Installing Formula Python...'
    brew install python
else
    echo ''
    echo '##### Python already installed'
fi


if [[ ! $gitok ]]; then
    echo ''
    echo '##### Installing Formula Git...'
    brew install git
else
    echo ''
    echo '##### Git already installed'
fi


if [[ ! $pipok ]]; then
    echo ''
    echo '##### Installing PIP for current user'
    pip install --upgrade --user
    pip install --upgrade pip --user

    echo ''
    echo '##### Installing virtualenv for current user'
    pip install virtualenv --user
    pip install virtualenvwrapper --user
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
echo '##### DONE!!!'

