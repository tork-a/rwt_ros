cmake_minimum_required(VERSION 2.8.3)
project(ros3djs)

find_package(catkin REQUIRED)

catkin_package(
)

install(DIRECTORY www/
  DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}/www
)