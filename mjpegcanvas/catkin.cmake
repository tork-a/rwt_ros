cmake_minimum_required(VERSION 2.8.3)
project(mjpegcanvas)

find_package(catkin REQUIRED COMPONENTS
  mjpeg_server
)

catkin_package(
  CATKIN_DEPENDS mjpeg_server
)

include_directories(
  ${catkin_INCLUDE_DIRS}
)

install(DIRECTORY www/
  DESTINATION ${CATKIN_PACKAGE_SHARE_DESTINATION}/www
)
