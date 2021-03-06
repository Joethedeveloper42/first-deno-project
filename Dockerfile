FROM maxmcd/deno

LABEL version="1.0" name="deno-and-oak-starter"

WORKDIR /app

EXPOSE 8080

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
COPY deps.ts .
RUN deno cache deps.ts

ADD . /app

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["--allow-net", "main.ts"]