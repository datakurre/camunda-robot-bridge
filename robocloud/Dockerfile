# https://robocorp.com/docs/robocorp-cloud/robot-workforce/setting-local-container

# Select the base image
FROM ubuntu:18.04

ARG NAME
ARG LINK_TOKEN

# Set all variables that affect programs to follow the same encoding
ENV LANG=C.UTF-8 LANGUAGE=C.UTF-8 LC_ALL=C.UTF-8

# Install here all the software your process needs in order to execute
RUN apt-get update --fix-missing && \
    apt-get install -y wget bzip2 ca-certificates curl bash build-essential && \
    apt-get install -y fonts-indic fonts-noto fonts-noto-cjk && \
    apt-get install -y libgtk-3-0 libdbus-glib-1-2 libx11-xcb1 libxt6 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Running as non-sudo user 'worker'
RUN useradd --no-log-init --system --create-home --shell /bin/bash worker
USER worker
WORKDIR /home/worker

# Create the agent inside the image
# Note 2021-03-15: Improvements coming to the loading of worker -> rcc -> micromamba to enclose these to some init commands.
RUN mkdir -p /home/worker/bin && mkdir -p /home/worker/instance
RUN curl --silent --show-error --fail -o /home/worker/bin/robocloud-worker https://downloads.cloud.robocorp.com/runtime/latest/linux64/robocloud-worker
RUN chmod +x /home/worker/bin/robocloud-worker

# Create rcc inside the image
# When creating images one should always use specific versions to avoid unwanted changes, but also maintain the versions up-to-date.
# RCC change log at: https://github.com/robocorp/rcc/blob/master/docs/changelog.md
RUN mkdir -p /home/worker/bin/rcc/linux64
RUN curl --silent --show-error --fail -o /home/worker/bin/rcc/linux64/rcc https://downloads.robocorp.com/rcc/releases/v9.5.2/linux64/rcc
RUN chmod +x /home/worker/bin/rcc/linux64/rcc

# Add Micromamba for RCC
# RCC requires a specific version of Micromamba and will download it as needed
# This step just avoids the download.
RUN mkdir -p /home/worker/.robocorp/bin
RUN curl --silent --show-error --fail -o /home/worker/.robocorp/bin/micromamba https://downloads.robocorp.com/micromamba/v0.7.14/linux64/micromamba
RUN chmod +x /home/worker/.robocorp/bin/micromamba
ENV PATH /home/worker/.robocorp/bin:$PATH


# Setup the run environment(s)
# Here you can give conda.yaml instructions to pre setup any kind of environment
# that will be run in the container
# RUN bin/rcc/linux64/rcc env new path/to/my/conda.yaml

# Link the App to Robocorp Cloud
RUN /home/worker/bin/robocloud-worker link "$LINK_TOKEN" --name "$NAME" --instance-path /home/worker/instance

ENTRYPOINT [ "/home/worker/bin/robocloud-worker", "start", "--instance-path", "/home/worker/instance" ]

